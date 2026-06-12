'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { api, type ApiResponse } from '@/lib/api';
import { getFirebase } from '@/lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from 'firebase/auth';

declare global {
  interface Window { _confirm?: ConfirmationResult; }
}

export default function PhoneStep() {
  const router = useRouter();
  const [digits, setDigits] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const verifierRef = useRef<RecaptchaVerifier | null>(null);

  // Clean up the verifier on unmount so we don't leak invisible widgets
  // and so re-mounts always get a fresh one.
  useEffect(() => {
    return () => {
      try { verifierRef.current?.clear(); } catch {}
      verifierRef.current = null;
    };
  }, []);

  const ensureVerifier = (): RecaptchaVerifier => {
    if (verifierRef.current) return verifierRef.current;
    const fb = getFirebase();
    if (!fb) throw new Error('Firebase not initialized');
    if (!recaptchaRef.current) throw new Error('reCAPTCHA container not mounted');
    const v = new RecaptchaVerifier(fb.auth, recaptchaRef.current, { size: 'invisible' });
    verifierRef.current = v;
    return v;
  };

  const submit = async () => {
    if (digits.length !== 10) { setErr('Enter a 10-digit number'); return; }
    setLoading(true); setErr('');
    const phone = `+91${digits}`;

    // Fast path: backend-owned OTP over Indian SMS routes — no reCAPTCHA,
    // no Firebase. Server replies provider:'firebase' when its SMS provider
    // isn't configured, in which case we fall through below.
    try {
      const { data } = await api.post<ApiResponse<{ provider: 'sms' | 'firebase' }>>(
        '/auth/otp/send',
        { phone }
      );
      if (data.provider === 'sms') {
        sessionStorage.setItem('numo_phone', phone);
        sessionStorage.setItem('numo_otp_mode', 'backend');
        router.push('/checkout/otp');
        return;
      }
    } catch (e: any) {
      // Rate limits are real answers — show them. Other errors fall through.
      if (/wait|too many/i.test(e?.message || '')) {
        setErr(e.message);
        setLoading(false);
        return;
      }
    }

    try {
      const fb = getFirebase();
      if (!fb) throw new Error('Auth not ready');
      const verifier = ensureVerifier();
      const confirmation = await signInWithPhoneNumber(fb.auth, phone, verifier);
      window._confirm = confirmation;
      sessionStorage.setItem('numo_phone', phone);
      sessionStorage.setItem('numo_otp_mode', 'firebase');
      router.push('/checkout/otp');
    } catch (e: any) {
      console.error('[phone submit]', e);
      // If the verifier got into a bad state, throw it away — next click rebuilds it
      try { verifierRef.current?.clear(); } catch {}
      verifierRef.current = null;
      setErr(e?.message || 'Could not send OTP');
      setLoading(false);
    }
  };

  return (
    <Screen
      title="Enter your phone number"
      subtitle="We'll send a one-time code to verify."
      footer={
        <>
          <button className="btn-primary" onClick={submit} disabled={loading || digits.length !== 10}>
            {loading ? 'Sending OTP…' : 'Send code'}
          </button>
          <p className="text-xs text-inkMuted text-center mt-3">
            Use the same number when you install the app — your plan & trial will be ready.
          </p>
        </>
      }
    >
      <div className="flex items-center gap-3 border-2 border-border rounded-2xl p-4 bg-surface focus-within:border-green">
        <span className="text-xl font-semibold">🇮🇳 +91</span>
        <input
          type="tel"
          inputMode="numeric"
          value={digits}
          onChange={(e) => { setDigits(e.target.value.replace(/\D/g, '').slice(0, 10)); setErr(''); }}
          placeholder="98765 43210"
          className="flex-1 text-xl bg-transparent outline-none"
          autoFocus
        />
      </div>
      {err && <p className="text-warning text-sm mt-3">{err}</p>}
      <div ref={recaptchaRef} id="recaptcha-container" />
    </Screen>
  );
}
