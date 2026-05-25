'use client';

import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { OptionCard } from '@/components/OptionCard';
import { useFunnelStore } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

const OPTIONS = [
  { value: 0.25, label: '0.25 kg / week', hint: 'Slow & steady' },
  { value: 0.5, label: '0.5 kg / week', hint: 'Recommended' },
  { value: 0.75, label: '0.75 kg / week', hint: 'Faster' },
  { value: 1, label: '1 kg / week', hint: 'Aggressive' },
];

export default function PaceStep() {
  const router = useRouter();
  const pace = useFunnelStore((s) => s.pace_kg_per_week);
  const set = useFunnelStore((s) => s.set);

  const pick = (v: number) => {
    set('pace_kg_per_week', v);
    router.push(nextStep('pace'));
  };

  return (
    <Screen step={stepIndex('pace')} total={TOTAL_STEPS} title="How fast do you want to reach it?">
      <div className="space-y-3">
        {OPTIONS.map((o) => (
          <OptionCard key={o.value} label={o.label} hint={o.hint} selected={pace === o.value} onClick={() => pick(o.value)} />
        ))}
      </div>
    </Screen>
  );
}
