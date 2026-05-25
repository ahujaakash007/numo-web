'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { NumberPicker } from '@/components/NumberPicker';
import { useFunnelStore } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

export default function AgeStep() {
  const router = useRouter();
  const initial = useFunnelStore((s) => s.age);
  const setStore = useFunnelStore((s) => s.set);
  const [age, setAge] = useState<number>(initial ?? 28);

  const submit = () => {
    setStore('age', age);
    router.push(nextStep('age'));
  };

  return (
    <Screen
      step={stepIndex('age')}
      total={TOTAL_STEPS}
      title="How old are you?"
      footer={<button className="btn-primary" onClick={submit}>Continue</button>}
    >
      <NumberPicker min={18} max={100} value={age} onChange={setAge} suffix="yrs" />
    </Screen>
  );
}
