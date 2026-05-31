'use client';

import { useRouter } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { useFunnelStore, type Obstacle } from '@/store/useFunnelStore';
import { nextStep, stepIndex, TOTAL_STEPS } from '../steps';

const OPTIONS: { value: Obstacle; label: string; emoji: string }[] = [
  { value: 'inconsistency', label: 'Lack of consistency', emoji: '📉' },
  { value: 'bad_eating', label: 'Bad eating habits', emoji: '🍕' },
  { value: 'no_support', label: 'Lack of support', emoji: '🤝' },
  { value: 'busy_schedule', label: 'Busy schedule', emoji: '⏰' },
  { value: 'emotional_eating', label: 'Emotional eating', emoji: '😮‍💨' },
  { value: 'dont_know_what_to_eat', label: "Don't know what to eat", emoji: '🤔' },
];

export default function ObstaclesStep() {
  const router = useRouter();
  const selected = useFunnelStore((s) => s.obstacles);
  const toggle = useFunnelStore((s) => s.toggleObstacle);

  return (
    <Screen
      step={stepIndex('obstacles')}
      total={TOTAL_STEPS}
      title="What's stopping you from reaching your goals?"
      subtitle="Pick all that apply."
      footer={
        <button className="btn-primary" onClick={() => router.push(nextStep('obstacles'))} disabled={selected.length === 0}>
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
