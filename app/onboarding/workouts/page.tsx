'use client';

import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { OptionCard } from '@/components/OptionCard';
import { useFunnelStore } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

const OPTIONS: { value: '0' | '1-2' | '3-4' | '5+'; label: string; hint: string }[] = [
  { value: '0', label: 'None', hint: 'Mostly sedentary' },
  { value: '1-2', label: '1–2 days / week', hint: 'Light activity' },
  { value: '3-4', label: '3–4 days / week', hint: 'Moderately active' },
  { value: '5+', label: '5+ days / week', hint: 'Very active' },
];

export default function WorkoutsStep() {
  const router = useRouter();
  const workouts = useFunnelStore((s) => s.workouts);
  const set = useFunnelStore((s) => s.set);

  const pick = (v: '0' | '1-2' | '3-4' | '5+') => {
    set('workouts', v);
    router.push(nextStep('workouts'));
  };

  return (
    <Screen step={stepIndex('workouts')} total={TOTAL_STEPS} title="How often do you work out?">
      <div className="space-y-3">
        {OPTIONS.map((o) => (
          <OptionCard key={o.value} label={o.label} hint={o.hint} selected={workouts === o.value} onClick={() => pick(o.value)} />
        ))}
      </div>
    </Screen>
  );
}
