'use client';

import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { OptionCard } from '@/components/OptionCard';
import { useFunnelStore, type PriorExperience } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

const OPTIONS: { value: PriorExperience; label: string; hint: string }[] = [
  { value: 'new', label: 'Totally new to this', hint: 'First time tracking calories' },
  { value: 'tried_quit', label: 'Tried before, quit', hint: 'It felt like too much work' },
  { value: 'currently_counting', label: 'Currently tracking', hint: 'Looking for a better tool' },
];

export default function ExperienceStep() {
  const router = useRouter();
  const exp = useFunnelStore((s) => s.prior_experience);
  const set = useFunnelStore((s) => s.set);

  const pick = (v: PriorExperience) => {
    set('prior_experience', v);
    router.push(nextStep('experience'));
  };

  return (
    <Screen step={stepIndex('experience')} total={TOTAL_STEPS} title="Have you tracked calories before?">
      <div className="space-y-3">
        {OPTIONS.map((o) => (
          <OptionCard key={o.value} label={o.label} hint={o.hint} selected={exp === o.value} onClick={() => pick(o.value)} />
        ))}
      </div>
    </Screen>
  );
}
