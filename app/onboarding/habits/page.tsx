'use client';

import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { useFunnelStore, type HabitChange } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

const OPTIONS: { value: HabitChange; label: string; emoji: string }[] = [
  { value: 'less_sugar', label: 'Less sugar', emoji: '🍬' },
  { value: 'less_junk', label: 'Less junk food', emoji: '🍔' },
  { value: 'stop_binge', label: 'Stop bingeing', emoji: '🛑' },
  { value: 'more_greens', label: 'More greens', emoji: '🥦' },
  { value: 'less_stress_eating', label: 'Less stress eating', emoji: '😌' },
  { value: 'cook_more', label: 'Cook at home more', emoji: '👩‍🍳' },
];

export default function HabitsStep() {
  const router = useRouter();
  const selected = useFunnelStore((s) => s.habit_changes);
  const toggle = useFunnelStore((s) => s.toggleHabit);

  return (
    <Screen
      step={stepIndex('habits')}
      total={TOTAL_STEPS}
      title="What do you want to change?"
      subtitle="Pick all that apply."
      footer={
        <button className="btn-primary" onClick={() => router.push(nextStep('habits'))} disabled={selected.length === 0}>
          Continue
        </button>
      }
    >
      <div className="space-y-3">
        {OPTIONS.map((o) => {
          const on = selected.includes(o.value);
          return (
            <button
              key={o.value}
              onClick={() => toggle(o.value)}
              className={`w-full text-left p-4 rounded-2xl border-2 flex items-center gap-3 ${
                on ? 'border-green bg-greenSoft' : 'border-border bg-surface'
              }`}
            >
              <span className="text-2xl">{o.emoji}</span>
              <span className="font-semibold text-lg">{o.label}</span>
              {on && <span className="ml-auto text-green">✓</span>}
            </button>
          );
        })}
      </div>
    </Screen>
  );
}
