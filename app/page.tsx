'use client';

import Link from 'next/link';
import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFunnelStore } from '@/store/useFunnelStore';
import { trackPixel } from '@/lib/pixel';

function UtmCapture() {
  const params = useSearchParams();
  const captureUtms = useFunnelStore((s) => s.captureUtms);
  useEffect(() => {
    captureUtms(new URLSearchParams(params.toString()));
  }, [params, captureUtms]);
  return null;
}

export default function Landing() {
  return (
    <main className="min-h-screen max-w-md mx-auto px-6 pt-12 pb-8 flex flex-col">
      <Suspense fallback={null}><UtmCapture /></Suspense>
      <div className="text-center">
        <div className="text-4xl mb-2">🥗</div>
        <h1 className="text-4xl font-extrabold text-ink leading-tight">
          Eat smart.<br />Hit your goal.
        </h1>
        <p className="mt-3 text-lg text-inkSoft">
          Numo builds your personalised calorie & macro plan in 2 minutes.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        <Benefit emoji="📸" title="Scan any meal" sub="AI estimates calories & macros instantly." />
        <Benefit emoji="🎯" title="Daily targets that fit you" sub="Based on your goal, weight & lifestyle." />
        <Benefit emoji="🔥" title="Track progress" sub="Stay consistent. See real results." />
      </div>

      <div className="mt-auto pt-10">
        <Link
          href="/onboarding/goal"
          className="btn-primary block text-center"
          onClick={() => trackPixel('Lead')}
        >
          Get my free plan →
        </Link>
        <p className="text-center text-xs text-inkMuted mt-3">
          Takes ~2 mins. No commitment.
        </p>
      </div>
    </main>
  );
}

function Benefit({ emoji, title, sub }: { emoji: string; title: string; sub: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="text-2xl">{emoji}</div>
      <div>
        <div className="font-semibold text-ink">{title}</div>
        <div className="text-sm text-inkSoft">{sub}</div>
      </div>
    </div>
  );
}
