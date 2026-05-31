'use client';

import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { OptionCard } from '@/components/OptionCard';
import { useFunnelStore, type DietType } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

const OPTIONS: { value: DietType; label: string; hint: string }[] = [
  { value: 'vegetarian', label: 'Vegetarian', hint: 'No meat, fish or eggs' },
  { value: 'non_vegetarian', label: 'Non-vegetarian', hint: 'Everything' },
  { value: 'vegan', label: 'Vegan', hint: 'No animal products' },
  { value: 'veg_with_eggs', label: 'Vegetarian + eggs', hint: 'Eggetarian' },
];

export default function DietStep() {
  const router = useRouter();
  const diet = useFunnelStore((s) => s.diet_type);
  const set = useFunnelStore((s) => s.set);

  const pick = (v: DietType) => {
    set('diet_type', v);
    router.push(nextStep('diet'));
  };

  return (
    <Screen step={stepIndex('diet')} total={TOTAL_STEPS} title="What kind of diet do you follow?">
      <div className="space-y-3">
        {OPTIONS.map((o) => (
          <OptionCard key={o.value} label={o.label} hint={o.hint} selected={diet === o.value} onClick={() => pick(o.value)} />
        ))}
      </div>
    </Screen>
  );
}
