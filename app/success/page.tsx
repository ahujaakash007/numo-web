'use client';

import { useEffect } from 'react';
import { trackPixel } from '@/lib/pixel';
import { gaEvent } from '@/lib/ga';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=ai.numo.app';

export default function Success() {
  useEffect(() => {
    const paymentId = typeof window !== 'undefined' ? sessionStorage.getItem('numo_payment_id') : null;
    trackPixel('Purchase', { currency: 'INR', value: 1, content_name: 'numo_trial' }, paymentId || undefined);
    gaEvent('purchase', { currency: 'INR', value: 1, transaction_id: paymentId || undefined });
  }, []);

  const phone = typeof window !== 'undefined' ? sessionStorage.getItem('numo_phone') : '';

  return (
    <main className="max-w-md mx-auto px-6 pt-16 pb-12 flex flex-col items-center text-center min-h-screen">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-3xl font-serif font-semibold leading-tight tracking-tight">You're in!</h1>
      <p className="mt-3 text-inkSoft">
        Your ₹1 trial is <strong className="text-green">active and saved to your number</strong> —
        nothing else to set up. Two quick steps:
      </p>

      <div className="card mt-8 w-full">
        <div className="text-sm text-inkSoft mb-1">Step 1</div>
        <div className="font-semibold">Download Numo from Google Play</div>
        <a
          href={PLAY_STORE_URL}
          className="btn-primary mt-4 block text-center"
          target="_blank"
          rel="noopener"
          onClick={() => gaEvent('play_store_click', { source: 'success_page' })}
        >
          Open Play Store →
        </a>
      </div>

      <div className="card mt-4 w-full">
        <div className="text-sm text-inkSoft mb-1">Step 2</div>
        <div className="font-semibold">Log in with this number</div>
        <div className="mt-3 bg-greenSoft text-green font-bold py-3 px-4 rounded-xl text-center text-lg">
          {phone || 'your phone number'}
        </div>
        <p className="text-xs text-inkMuted mt-2">
          Same number = your plan and trial load automatically. No new account, no re-payment.
        </p>
      </div>

      <p className="text-xs text-inkMuted mt-8 max-w-xs">
        Need help? Email{' '}
        <a href="mailto:support@numo.ai" className="underline">support@numo.ai</a>
      </p>
    </main>
  );
}
