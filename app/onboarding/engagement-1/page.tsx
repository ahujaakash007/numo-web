'use client';

import Link from 'next/link';
import { Screen } from '@/components/Screen';
import { WeightFallGraph } from '@/components/WeightFallGraph';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

export default function Engagement1() {
  return (
    <Screen
      step={stepIndex('engagement-1')}
      total={TOTAL_STEPS}
      title="Consistency beats perfection"
      subtitle="People who log 4+ days a week on Numo AI lose 2× more weight than those who don't track."
      footer={
        <Link href={nextStep('engagement-1')} className="btn-primary block text-center">Continue</Link>
      }
    >
      <div className="mt-8">
        <WeightFallGraph />
      </div>
    </Screen>
  );
}
