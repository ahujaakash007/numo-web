'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { useFunnelStore } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

export default function HeightStep() {
  const router = useRouter();
  const initial = useFunnelStore((s) => s.height_cm);
  const set = useFunnelStore((s) => s.set);
  const [unit, setUnit] = useState<'cm' | 'ft'>('cm');
  const [cm, setCm] = useState<string>(initial ? String(initial) : '');
  const [ft, setFt] = useState('');
  const [inches, setInches] = useState('');

  const compute = (): number | null => {
    if (unit === 'cm') {
      const n = parseFloat(cm);
      return isNaN(n) || n < 100 || n > 250 ? null : n;
    }
    const f = parseFloat(ft); const i = parseFloat(inches || '0');
    if (isNaN(f)) return null;
    const total = f * 30.48 + i * 2.54;
    return total >= 100 && total <= 250 ? Math.round(total) : null;
  };

  const submit = () => {
    const v = compute();
    if (!v) return;
    set('height_cm', v);
    router.push(nextStep('height'));
  };

  const v = compute();

  return (
    <Screen
      step={stepIndex('height')}
      total={TOTAL_STEPS}
      title="How tall are you?"
      footer={<button className="btn-primary" onClick={submit} disabled={!v}>Continue</button>}
    >
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setUnit('cm')}
          className={`flex-1 py-2 rounded-full font-medium ${unit === 'cm' ? 'bg-green text-white' : 'bg-surface border border-border'}`}
        >cm</button>
        <button
          onClick={() => setUnit('ft')}
          className={`flex-1 py-2 rounded-full font-medium ${unit === 'ft' ? 'bg-green text-white' : 'bg-surface border border-border'}`}
        >ft / in</button>
      </div>
      {unit === 'cm' ? (
        <input
          type="number"
          inputMode="numeric"
          value={cm}
          onChange={(e) => setCm(e.target.value)}
          placeholder="170"
          className="w-full text-5xl font-bold text-center bg-transparent border-b-2 border-border focus:border-green outline-none py-3"
          autoFocus
        />
      ) : (
        <div className="flex gap-3">
          <input type="number" inputMode="numeric" value={ft} onChange={(e) => setFt(e.target.value)} placeholder="ft" className="flex-1 text-4xl font-bold text-center bg-transparent border-b-2 border-border focus:border-green outline-none py-3" />
          <input type="number" inputMode="numeric" value={inches} onChange={(e) => setInches(e.target.value)} placeholder="in" className="flex-1 text-4xl font-bold text-center bg-transparent border-b-2 border-border focus:border-green outline-none py-3" />
        </div>
      )}
    </Screen>
  );
}
