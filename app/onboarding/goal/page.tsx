'use client';

import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { OptionCard } from '@/components/OptionCard';
import { useFunnelStore } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

export default function GoalStep() {
  const router = useRouter();
  const goal = useFunnelStore((s) => s.goal);
  const set = useFunnelStore((s) => s.set);

  const pick = (g: 'lose' | 'maintain' | 'gain') => {
    set('goal', g);
    router.push(nextStep('goal'));
  };

  return (
    <Screen step={stepIndex('goal')} total={TOTAL_STEPS} title="What's your goal?">
      <div className="space-y-3">
        <OptionCard label="Lose weight" hint="Eat in a calorie deficit" selected={goal === 'lose'} onClick={() => pick('lose')} />
        <OptionCard label="Maintain" hint="Stay where you are" selected={goal === 'maintain'} onClick={() => pick('maintain')} />
        <OptionCard label="Gain weight" hint="Build mass" selected={goal === 'gain'} onClick={() => pick('gain')} />
      </div>
    </Screen>
  );
}
