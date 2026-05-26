'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { api, type ApiResponse } from '@/lib/api';

interface TrialCheckoutResp {
  orderId: string;
  amount: number;
  customerId: string;
  razorpayKeyId: string;
}

declare global {
  interface Window { Razorpay: any; }
}

export default function PayStep() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const opened = useRef(false);

  const openRazorpay = async () => {
    if (opened.current) return;
    opened.current = true;
    try {
      const { data: checkout } = await api.post<ApiResponse<TrialCheckoutResp>>(
        '/subscription/trial/checkout',
        {}
      );

      const phone = sessionStorage.getItem('numo_phone') || '';
      const rzp = new window.Razorpay({
        key: checkout.razorpayKeyId,
        amount: checkout.amount,
        currency: 'INR',
        name: 'Numo AI',
        description: 'Trial ₹1 today, then ₹699/quarter. Cancel anytime.',
        order_id: checkout.orderId,
        customer_id: checkout.customerId,
        recurring: 1,
        // Keep method config explicit so we can verify what Razorpay returns.
        method: {
          upi: 1,
          card: 1,
          netbanking: 1,
          wallet: 0,
          emi: 0,
          paylater: 0,
        },
        prefill: { contact: phone },
        theme: { color: '#2E7D32' },
        handler: async (resp: any) => {
          try {
            await api.post('/subscription/trial/verify', {
              razorpay_order_id: resp.razorpay_order_id,
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_signature: resp.razorpay_signature,
            });
          } catch {
            // Backend may still verify via webhook
          }
          sessionStorage.setItem('numo_payment_id', resp.razorpay_payment_id);
          router.push('/success');
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            opened.current = false;
            setErr('Payment cancelled. Tap below to try again.');
          },
        },
      });
      rzp.open();
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      opened.current = false;
      setErr(e?.message || 'Could not start checkout');
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={openRazorpay}
      />
      <main className="max-w-md mx-auto px-6 py-20 text-center min-h-screen flex flex-col items-center justify-center">
        <div className="text-5xl mb-4">💳</div>
        <h1 className="text-2xl font-bold">
          {loading ? 'Opening payment…' : 'Razorpay closed'}
        </h1>
        <p className="text-inkSoft mt-2">₹1 to activate your trial</p>
        {err && <p className="text-warning text-sm mt-4 max-w-xs">{err}</p>}
        {!loading && (
          <button onClick={openRazorpay} className="btn-primary mt-6 max-w-xs">
            Open payment
          </button>
        )}
      </main>
    </>
  );
}
