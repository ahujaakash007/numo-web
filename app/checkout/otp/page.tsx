'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { api, setToken, type ApiResponse } from '@/lib/api';
import { useFunnelStore } from '@/store/useFunnelStore';

interface AuthResp {
  accessToken: string;
  refreshToken: string;
  user: { id: string; phone?: string; email?: string; name?: string };
}

export default function OtpStep() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const s = useFunnelStore();

  const submit = async () => {
    if (otp.length !== 6) { setErr('Enter the 6-digit code'); return; }
    setLoading(true); setErr('');
    let stage = 'init';
    try {
      const phone = sessionStorage.getItem('numo_phone') || '';
      const confirm = window._confirm;
      if (!confirm) throw new Error('OTP session expired — please go back and request a new code');

      stage = 'firebase-confirm';
      const credential = await confirm.confirm(otp);
      const idToken = await credential.user.getIdToken();

      // 1. Login on Numo backend (creates user if new)
      stage = 'backend-login';
      const { data: auth } = await api.post<ApiResponse<AuthResp>>(
        '/auth/firebase-phone',
        { idToken, phone }
      );
      setToken(auth.accessToken);

      // 2. Save onboarding answers
      stage = 'save-onboarding';
      await api.post('/onboarding', {
        goal: s.goal,
        gender: s.gender,
        age: s.age,
        height_cm: s.height_cm,
        weight_kg: s.weight_kg,
        goal_weight_kg: s.goal_weight_kg,
        pace_kg_per_week: s.pace_kg_per_week,
        workouts: s.workouts,
        meals_per_day: s.meals_per_day,
        habit_changes: s.habit_changes,
        prior_experience: s.prior_experience,
        name: s.name,
        source: 'web',
      });

      // 3. Move to payment
      router.push('/checkout/pay');
    } catch (e: any) {
      // Surface the real error so we can debug
      console.error('[OTP submit] stage=', stage, e);
      const detail = e?.message || String(e) || 'Unknown error';
      setErr(`${stage}: ${detail}`);
      setLoading(false);
    }
  };

  return (
    <Screen
      title="Enter the code"
      subtitle={`Sent to ${typeof window !== 'undefined' ? sessionStorage.getItem('numo_phone') : ''}`}
      footer={
        <button className="btn-primary" onClick={submit} disabled={loading || otp.length !== 6}>
          {loading ? 'Verifying…' : 'Verify'}
        </button>
      }
    >
      <input
        type="tel"
        inputMode="numeric"
        value={otp}
        onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setErr(''); }}
        placeholder="••••••"
        className="w-full text-5xl text-center tracking-widest bg-transparent border-b-2 border-border focus:border-green outline-none py-3"
        autoFocus
      />
      {err && <p className="text-warning text-sm mt-3 text-center">{err}</p>}
    </Screen>
  );
}
