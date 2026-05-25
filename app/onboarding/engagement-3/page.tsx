'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { stepIndex, TOTAL_STEPS } from '../steps';
import { trackPixel } from '@/lib/pixel';

export default function Engagement3() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    trackPixel('CompleteRegistration');
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(t); setTimeout(() => router.push('/plan'), 400); return 100; }
        return p + 4;
      });
    }, 60);
    return () => clearInterval(t);
  }, [router]);

  return (
    <Screen step={stepIndex('engagement-3')} total={TOTAL_STEPS} title="Building your plan…" subtitle="Crunching the numbers from your answers.">
      <div className="mt-12 mx-auto w-32 h-32 rounded-full border-8 border-greenSoft flex items-center justify-center text-3xl font-bold text-green">
        {progress}%
      </div>
      <div className="mt-8 space-y-2 text-sm text-inkSoft text-center">
        <div>✓ Calculating your metabolic rate</div>
        <div>{progress > 40 ? '✓' : '·'} Setting calorie target</div>
        <div>{progress > 80 ? '✓' : '·'} Balancing your macros</div>
      </div>
    </Screen>
  );
}
