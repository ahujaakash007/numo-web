'use client';

import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { OptionCard } from '@/components/OptionCard';
import { useFunnelStore, type MealsBand } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

const OPTIONS: { value: MealsBand; label: string }[] = [
  { value: '1', label: '1 meal' },
  { value: '2', label: '2 meals' },
  { value: '3', label: '3 meals' },
  { value: '4', label: '4 meals' },
  { value: '5+', label: '5+ meals' },
];

export default function MealsStep() {
  const router = useRouter();
  const meals = useFunnelStore((s) => s.meals_per_day);
  const set = useFunnelStore((s) => s.set);

  const pick = (v: MealsBand) => {
    set('meals_per_day', v);
    router.push(nextStep('meals'));
  };

  return (
    <Screen step={stepIndex('meals')} total={TOTAL_STEPS} title="How many meals do you usually eat?">
      <div className="space-y-3">
        {OPTIONS.map((o) => (
          <OptionCard key={o.value} label={o.label} selected={meals === o.value} onClick={() => pick(o.value)} />
        ))}
      </div>
    </Screen>
  );
}
