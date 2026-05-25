'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { useFunnelStore } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

export default function AgeStep() {
  const router = useRouter();
  const initial = useFunnelStore((s) => s.age);
  const set = useFunnelStore((s) => s.set);
  const [value, setValue] = useState<string>(initial ? String(initial) : '');
  const [err, setErr] = useState('');

  const submit = () => {
    const n = parseInt(value, 10);
    if (isNaN(n) || n < 13 || n > 100) {
      setErr('Please enter an age between 13 and 100.');
      return;
    }
    set('age', n);
    router.push(nextStep('age'));
  };

  return (
    <Screen
      step={stepIndex('age')}
      total={TOTAL_STEPS}
      title="How old are you?"
      footer={
        <button className="btn-primary" onClick={submit} disabled={!value}>
          Continue
        </button>
      }
    >
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => { setValue(e.target.value); setErr(''); }}
        placeholder="e.g. 28"
        className="w-full text-5xl font-bold text-center bg-transparent border-b-2 border-border focus:border-green outline-none py-3"
        autoFocus
      />
      {err && <p className="text-warning text-sm mt-3 text-center">{err}</p>}
    </Screen>
  );
}
