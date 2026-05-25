'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { NumberPicker } from '@/components/NumberPicker';
import { useFunnelStore } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

export default function GoalWeightStep() {
  const router = useRouter();
  const { weight_kg, goal, goal_weight_kg } = useFunnelStore();
  const setStore = useFunnelStore((s) => s.set);
  const [weight, setWeight] = useState<number>(
    goal_weight_kg ? Math.round(goal_weight_kg) : (weight_kg ? Math.round(weight_kg) - (goal === 'lose' ? 5 : -5) : 65)
  );
  const [err, setErr] = useState('');

  const submit = () => {
    if (weight_kg) {
      if (goal === 'lose' && weight >= weight_kg) { setErr('Goal weight should be less than current.'); return; }
      if (goal === 'gain' && weight <= weight_kg) { setErr('Goal weight should be more than current.'); return; }
    }
    setErr('');
    setStore('goal_weight_kg', weight);
    router.push(nextStep('goal-weight'));
  };

  return (
    <Screen
      step={stepIndex('goal-weight')}
      total={TOTAL_STEPS}
      title="What's your target weight?"
      footer={<button className="btn-primary" onClick={submit}>Continue</button>}
    >
      <NumberPicker min={30} max={200} value={weight} onChange={(v) => { setWeight(v); setErr(''); }} suffix="kg" />
      {err && <p className="text-warning text-sm mt-3 text-center">{err}</p>}
    </Screen>
  );
}
