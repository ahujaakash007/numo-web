'use client';

import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { OptionCard } from '@/components/OptionCard';
import { useFunnelStore } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

export default function GenderStep() {
  const router = useRouter();
  const gender = useFunnelStore((s) => s.gender);
  const set = useFunnelStore((s) => s.set);

  const pick = (g: 'male' | 'female') => {
    set('gender', g);
    router.push(nextStep('gender'));
  };

  return (
    <Screen step={stepIndex('gender')} total={TOTAL_STEPS} title="What's your gender?" subtitle="Helps us calculate your metabolic rate accurately.">
      <div className="space-y-3">
        <OptionCard label="Male" selected={gender === 'male'} onClick={() => pick('male')} />
        <OptionCard label="Female" selected={gender === 'female'} onClick={() => pick('female')} />
      </div>
    </Screen>
  );
}
