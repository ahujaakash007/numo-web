'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { useFunnelStore } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

export default function WeightStep() {
  const router = useRouter();
  const initial = useFunnelStore((s) => s.weight_kg);
  const set = useFunnelStore((s) => s.set);
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
  const [val, setVal] = useState<string>(initial ? String(initial) : '');

  const compute = (): number | null => {
    const n = parseFloat(val);
    if (isNaN(n)) return null;
    const kg = unit === 'kg' ? n : n * 0.4535924;
    return kg >= 30 && kg <= 300 ? Math.round(kg * 10) / 10 : null;
  };

  const submit = () => {
    const v = compute();
    if (!v) return;
    set('weight_kg', v);
    router.push(nextStep('weight'));
  };

  return (
    <Screen
      step={stepIndex('weight')}
      total={TOTAL_STEPS}
      title="What's your current weight?"
      footer={<button className="btn-primary" onClick={submit} disabled={!compute()}>Continue</button>}
    >
      <div className="flex gap-2 mb-6">
        <button onClick={() => setUnit('kg')} className={`flex-1 py-2 rounded-full font-medium ${unit === 'kg' ? 'bg-green text-white' : 'bg-surface border border-border'}`}>kg</button>
        <button onClick={() => setUnit('lb')} className={`flex-1 py-2 rounded-full font-medium ${unit === 'lb' ? 'bg-green text-white' : 'bg-surface border border-border'}`}>lb</button>
      </div>
      <input
        type="number"
        inputMode="decimal"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={unit === 'kg' ? '70' : '154'}
        className="w-full text-5xl font-bold text-center bg-transparent border-b-2 border-border focus:border-green outline-none py-3"
        autoFocus
      />
    </Screen>
  );
}
