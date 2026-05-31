'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFunnelStore } from '@/store/useFunnelStore';
import { trackPixel } from '@/lib/pixel';
import { Stepper } from '@/components/Stepper';
import { stepIndex, TOTAL_STEPS } from '../steps';

const STAGES = [
  { until: 22, label: 'Analysing your goal', detail: (s: any) => `Target: ${s.goal === 'lose' ? 'lose' : s.goal === 'gain' ? 'gain' : 'maintain'} weight`, ms: 1800 },
  { until: 45, label: 'Calculating your metabolic rate', detail: (s: any) => `Based on ${s.age} yrs, ${s.height_cm} cm, ${s.weight_kg} kg`, ms: 2200 },
  { until: 68, label: 'Adjusting for your activity', detail: (s: any) => `${s.workouts} workouts per week`, ms: 2000 },
  { until: 88, label: 'Balancing your macros', detail: () => 'Protein • Carbs • Fats', ms: 1800 },
  { until: 100, label: 'Finishing your plan', detail: (s: any) => `Pace: ${s.pace_kg_per_week} kg/week`, ms: 1700 },
];

export default function Engagement3() {
  const router = useRouter();
  const s = useFunnelStore();
  const [stageIdx, setStageIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    trackPixel('CompleteRegistration');
    let cancelled = false;

    const run = async () => {
      let p = 0;
      for (let i = 0; i < STAGES.length; i++) {
        if (cancelled) return;
        setStageIdx(i);
        const target = STAGES[i].until;
        const startP = p;
        const start = Date.now();
        await new Promise<void>((resolve) => {
          const tick = () => {
            const elapsed = Date.now() - start;
            const t = Math.min(1, elapsed / STAGES[i].ms);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - t, 3);
            const next = startP + (target - startP) * eased;
            p = next;
            setProgress(next);
            if (t < 1 && !cancelled) requestAnimationFrame(tick);
            else resolve();
          };
          requestAnimationFrame(tick);
        });
      }
      if (cancelled) return;
      // Hold at 100% for a satisfying beat before reveal
      await new Promise((r) => setTimeout(r, 900));
      if (!cancelled) router.push('/plan');
    };
    run();
    return () => { cancelled = true; };
  }, [router]);

  const stage = STAGES[stageIdx];

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col">
      <Stepper current={stepIndex('engagement-3')} total={TOTAL_STEPS} />

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Circular progress */}
        <div className="relative w-44 h-44">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#E8E0D2" strokeWidth="6" />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#2E7D32"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={276.46}
              strokeDashoffset={276.46 * (1 - progress / 100)}
              style={{ transition: 'stroke-dashoffset 0.08s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-green tabular-nums">{Math.round(progress)}%</div>
          </div>
        </div>

        <h2 className="mt-10 text-2xl font-bold text-ink min-h-[2.5rem]">{stage.label}</h2>
        <p className="mt-2 text-base text-inkSoft min-h-[1.5rem]">{stage.detail(s)}</p>

        {/* Stage list */}
        <div className="mt-12 w-full space-y-2.5 text-left">
          {STAGES.map((st, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                i < stageIdx ? 'bg-green text-white' : i === stageIdx ? 'bg-green/30 text-green' : 'bg-border text-inkMuted'
              }`}>
                {i < stageIdx ? '✓' : i === stageIdx ? '•' : ''}
              </span>
              <span className={i <= stageIdx ? 'text-ink' : 'text-inkMuted'}>{st.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
