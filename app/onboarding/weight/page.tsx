'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { NumberPicker } from '@/components/NumberPicker';
import { useFunnelStore } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

export default function WeightStep() {
  const router = useRouter();
  const initial = useFunnelStore((s) => s.weight_kg);
  const setStore = useFunnelStore((s) => s.set);
  const [weight, setWeight] = useState<number>(initial ? Math.round(initial) : 70);

  const submit = () => {
    setStore('weight_kg', weight);
    router.push(nextStep('weight'));
  };

  return (
    <Screen
      step={stepIndex('weight')}
      total={TOTAL_STEPS}
      title="What's your current weight?"
      footer={<button className="btn-primary" onClick={submit}>Continue</button>}
    >
      <NumberPicker min={30} max={200} value={weight} onChange={setWeight} suffix="kg" />
    </Screen>
  );
}
