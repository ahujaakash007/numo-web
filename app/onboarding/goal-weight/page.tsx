'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { useFunnelStore } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

export default function GoalWeightStep() {
  const router = useRouter();
  const { weight_kg, goal, goal_weight_kg } = useFunnelStore();
  const set = useFunnelStore((s) => s.set);
  const [val, setVal] = useState<string>(goal_weight_kg ? String(goal_weight_kg) : '');
  const [err, setErr] = useState('');

  const compute = (): number | null => {
    const n = parseFloat(val);
    if (isNaN(n) || n < 30 || n > 300) return null;
    if (!weight_kg) return n;
    if (goal === 'lose' && n >= weight_kg) { setErr('Goal weight should be less than current.'); return null; }
    if (goal === 'gain' && n <= weight_kg) { setErr('Goal weight should be more than current.'); return null; }
    return Math.round(n * 10) / 10;
  };

  const submit = () => {
    const v = compute();
    if (!v) return;
    setErr('');
    set('goal_weight_kg', v);
    router.push(nextStep('goal-weight'));
  };

  return (
    <Screen
      step={stepIndex('goal-weight')}
      total={TOTAL_STEPS}
      title="What's your target weight?"
      footer={<button className="btn-primary" onClick={submit} disabled={!compute()}>Continue</button>}
    >
      <input
        type="number"
        inputMode="decimal"
        value={val}
        onChange={(e) => { setVal(e.target.value); setErr(''); }}
        placeholder="65"
        className="w-full text-5xl font-bold text-center bg-transparent border-b-2 border-border focus:border-green outline-none py-3"
        autoFocus
      />
      <p className="text-center mt-2 text-inkSoft">kg</p>
      {err && <p className="text-warning text-sm mt-3 text-center">{err}</p>}
    </Screen>
  );
}
