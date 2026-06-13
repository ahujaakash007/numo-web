'use client';

import Link from 'next/link';
import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFunnelStore } from '@/store/useFunnelStore';
import { trackPixel } from '@/lib/pixel';
import { gaEvent } from '@/lib/ga';
import { Footer } from '@/components/Footer';

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
    <main className="min-h-screen max-w-md mx-auto px-6 pt-8 pb-8 flex flex-col">
      <Suspense fallback={null}><UtmCapture /></Suspense>

      {/* Brand */}
      <div className="text-center text-green font-serif font-semibold tracking-tight text-2xl">
        numo<span className="text-coral"> ai</span>
      </div>

      {/* Hero */}
      <div className="text-center mt-8">
        <div className="inline-block bg-greenSoft text-green text-xs font-bold tracking-wide px-3 py-1 rounded-full">
          📸 AI CALORIE TRACKING FOR INDIAN FOOD
        </div>
        <h1 className="mt-5 text-[2.3rem] leading-[1.08] font-serif font-semibold tracking-tight text-ink">
          Snap your plate.<br />Skip the maths.
        </h1>
      </div>

      {/* Scan demo card — shows the product in action */}
      <div className="mt-8 card !p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-green to-[#1F5A26] px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-xl">🍽️</div>
          <div className="text-white">
            <div className="font-semibold leading-tight">Your plate, scanned</div>
            <div className="text-white/70 text-xs">AI detected 3 items in 2s</div>
          </div>
        </div>
        <div className="px-5 py-4 space-y-2.5">
          <ScanRow emoji="🫓" name="2 Roti" kcal={180} />
          <ScanRow emoji="🍲" name="Dal tadka" kcal={160} />
          <ScanRow emoji="🧀" name="Paneer sabzi" kcal={200} />
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-sm text-inkMuted">Total</span>
            <span className="font-bold text-ink">≈ 540 kcal · 28g protein</span>
          </div>
        </div>
      </div>

      {/* Compact feature chips */}
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        <Chip>📸 Snap, don&apos;t type</Chip>
        <Chip>🇮🇳 Built for Indian meals</Chip>
        <Chip>🎯 Personalised plan</Chip>
      </div>

      {/* CTA */}
      <div className="mt-auto pt-8">
        <Link
          href="/onboarding/goal"
          className="btn-primary block text-center"
          onClick={() => { trackPixel('Lead'); gaEvent('generate_lead'); }}
        >
          Get my free plan →
        </Link>
        <p className="text-center text-xs text-inkMuted mt-3">
          Takes ~2 mins · ₹1 trial · cancel anytime
        </p>
      </div>

      <Footer />
    </main>
  );
}

function ScanRow({ emoji, name, kcal }: { emoji: string; name: string; kcal: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xl">{emoji}</span>
      <span className="flex-1 text-ink">{name}</span>
      <span className="text-inkSoft text-sm tabular-nums">{kcal} kcal</span>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-surface border border-border rounded-full px-3.5 py-2 text-sm font-medium text-ink">
      {children}
    </span>
  );
}
