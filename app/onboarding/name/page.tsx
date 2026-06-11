'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { useFunnelStore } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

// First step — personalises the plan reveal ("Prerna's plan") and the app
// greeting after handoff. Skippable so it never costs a conversion.
export default function NameStep() {
  const router = useRouter();
  const stored = useFunnelStore((s) => s.name);
  const set = useFunnelStore((s) => s.set);
  const [name, setName] = useState(stored ?? '');

  const go = (save: boolean) => {
    if (save && name.trim()) set('name', name.trim());
    router.push(nextStep('name'));
  };

  return (
    <Screen step={stepIndex('name')} total={TOTAL_STEPS} title="What should we call you?">
      <p className="text-inkSoft text-sm -mt-2 mb-4">Just your first name — it makes your plan feel like yours.</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && name.trim()) go(true); }}
        placeholder="Your name"
        autoFocus
        maxLength={30}
        className="w-full rounded-2xl border-2 border-border bg-surface px-5 py-4 text-lg outline-none focus:border-green"
      />
      <button onClick={() => go(true)} disabled={!name.trim()} className="btn-primary mt-6 disabled:opacity-40">
        Continue
      </button>
      <button onClick={() => go(false)} className="w-full text-center text-inkMuted text-sm mt-3 py-2">
        Skip for now
      </button>
    </Screen>
  );
}
