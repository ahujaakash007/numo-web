'use client';

import Link from 'next/link';
import { Screen } from '@/components/Screen';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

export default function Engagement2() {
  return (
    <Screen
      step={stepIndex('engagement-2')}
      total={TOTAL_STEPS}
      title="Workouts matter — diet matters more."
      subtitle="80% of your results come from what you eat. We'll dial that in for you."
      footer={
        <Link href={nextStep('engagement-2')} className="btn-primary block text-center">Got it</Link>
      }
    >
      <div className="text-center text-6xl mt-12">🥗</div>
    </Screen>
  );
}
