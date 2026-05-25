'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { NumberPicker } from '@/components/NumberPicker';
import { useFunnelStore } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

export default function HeightStep() {
  const router = useRouter();
  const initial = useFunnelStore((s) => s.height_cm);
  const setStore = useFunnelStore((s) => s.set);
  const [height, setHeight] = useState<number>(initial ?? 170);

  const submit = () => {
    setStore('height_cm', height);
    router.push(nextStep('height'));
  };

  return (
    <Screen
      step={stepIndex('height')}
      total={TOTAL_STEPS}
      title="How tall are you?"
      footer={<button className="btn-primary" onClick={submit}>Continue</button>}
    >
      <NumberPicker min={120} max={220} value={height} onChange={setHeight} suffix="cm" />
    </Screen>
  );
}
