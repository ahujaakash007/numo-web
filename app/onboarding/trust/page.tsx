'use client';

import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

export default function TrustStep() {
  const router = useRouter();
  return (
    <Screen
      step={stepIndex('trust')}
      total={TOTAL_STEPS}
      title="Thank you for trusting us"
      subtitle="Let's personalise Numo AI for you."
      footer={
        <button className="btn-primary" onClick={() => router.push(nextStep('trust'))}>
          Create my plan →
        </button>
      }
    >
      <div className="flex items-center justify-center mt-8">
        <div className="relative w-40 h-40 rounded-full bg-greenSoft flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-surface border-2 border-green/40 flex items-center justify-center">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="absolute top-1 right-6 w-3.5 h-3.5 rounded-full bg-coral" />
          <span className="absolute bottom-5 left-2 w-2.5 h-2.5 rounded-full bg-green" />
          <span className="absolute top-12 -left-1 w-2 h-2 rounded-full bg-coral" />
        </div>
      </div>
    </Screen>
  );
}
