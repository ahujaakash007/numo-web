'use client';

import Link from 'next/link';
import { Screen } from '@/components/Screen';
import { DietPie } from '@/components/DietPie';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

export default function Engagement2() {
  return (
    <Screen
      step={stepIndex('engagement-2')}
      total={TOTAL_STEPS}
      title="Weight loss is 80% what you eat"
      subtitle="You can't out-train a bad diet. Numo AI counts every calorie from a single photo — so the 80% takes care of itself."
      footer={
        <Link href={nextStep('engagement-2')} className="btn-primary block text-center">Got it</Link>
      }
    >
      <div className="mt-8">
        <DietPie />
      </div>
    </Screen>
  );
}
