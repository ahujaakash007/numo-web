'use client';

import { useRouter } from 'next/navigation';
import { useFunnelStore } from '@/store/useFunnelStore';
import { computePlan, projectedGoalDate } from '@/lib/calorieMath';
import { trackPixel } from '@/lib/pixel';
import { gaEvent } from '@/lib/ga';
import { TESTIMONIALS } from '@/lib/testimonials';

export default function PlanReveal() {
  const router = useRouter();
  const s = useFunnelStore();

  const ready = !!(s.gender && s.age && s.height_cm && s.weight_kg && s.goal && s.pace_kg_per_week !== undefined && s.workouts);
  if (!ready) {
    return (
      <div className="max-w-md mx-auto px-6 py-12 text-center">
        <p className="text-inkSoft">Missing onboarding data.</p>
        <button onClick={() => router.push('/onboarding/goal')} className="btn-primary mt-4">Start over</button>
      </div>
    );
  }

  const plan = computePlan({
    gender: s.gender!,
    age: s.age!,
    height_cm: s.height_cm!,
    weight_kg: s.weight_kg!,
    goal: s.goal!,
    pace_kg_per_week: s.pace_kg_per_week!,
    workouts: s.workouts!,
  });
  const goalDate = projectedGoalDate(s.weight_kg!, s.goal_weight_kg!, s.pace_kg_per_week!);
  const dateStr = goalDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const startTrial = () => {
    trackPixel('InitiateCheckout', { currency: 'INR', value: 1 });
    gaEvent('begin_checkout', { currency: 'INR', value: 1 });
    router.push('/checkout/phone');
  };

  return (
    <main className="max-w-md mx-auto px-6 pt-8 pb-32 relative">
      <h1 className="text-3xl font-bold">Your plan is ready 🎉</h1>

      {/* Daily calorie target — blurred */}
      <div className="card mt-6 relative overflow-hidden">
        <div className="text-sm text-inkSoft">Daily calorie target</div>
        <div className="relative mt-2">
          <div className="text-5xl font-extrabold blur-md select-none pointer-events-none">
            {plan.daily_kcal}
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="w-32 h-12 rounded-lg bg-border/60" />
          </div>
        </div>
        <div className="text-base text-inkSoft mt-1">kcal / day</div>
      </div>

      {/* Macros — blurred bars */}
      <div className="card mt-4 space-y-3">
        <BlurMacro label="Protein" color="bg-coral" />
        <BlurMacro label="Carbs" color="bg-blue" />
        <BlurMacro label="Fats" color="bg-green" />
      </div>

      {/* Timeline */}
      <div className="card mt-4">
        <div className="text-sm text-inkSoft">Projected timeline</div>
        <div className="text-lg font-semibold mt-1 blur-sm select-none">
          {s.goal_weight_kg} kg by {dateStr}
        </div>
      </div>

      {plan.warning && (
        <p className="text-warning text-xs text-center mt-3 px-4">{plan.warning}</p>
      )}

      {/* Social proof */}
      <h2 className="text-xl font-bold mt-8 mb-3">Why people stay with Numo</h2>
      <div className="space-y-3">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="card">
            <div className="text-[#F5A623] text-sm tracking-wide">{'★'.repeat(t.stars)}</div>
            <p className="text-ink mt-1.5">“{t.quote}”</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-7 h-7 rounded-full bg-greenSoft text-green font-bold text-xs flex items-center justify-center">
                {t.name.charAt(0)}
              </div>
              <span className="text-sm text-inkMuted flex-1">{t.name}, {t.city}</span>
              <span className="text-xs font-bold text-green bg-greenSoft rounded-full px-2 py-0.5">{t.result}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky paywall bottom sheet */}
      <div className="fixed left-0 right-0 bottom-0 bg-surface shadow-2xl rounded-t-3xl px-6 pt-5 pb-8 max-w-md mx-auto border-t border-border">
        <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center">Unlock your plan</h2>

        <div className="mt-4 rounded-2xl border-2 border-green bg-greenSoft p-5 text-center">
          <div className="inline-block bg-green text-white text-xs font-bold tracking-wider px-3 py-1 rounded-full mb-2">
            TRY IT FIRST
          </div>
          <div className="flex items-start justify-center">
            <span className="text-2xl font-bold text-green mt-2">₹</span>
            <span className="text-6xl font-extrabold text-green leading-none">1</span>
          </div>
          <div className="text-sm text-inkSoft mt-1">for 1 day · full access · cancel anytime</div>
        </div>

        <button onClick={startTrial} className="btn-primary mt-4">
          Start ₹1 Trial →
        </button>

        <p className="text-xs text-inkMuted text-center mt-3">
          Then ₹699/quarter (₹233/mo). Cancel anytime before trial ends.
        </p>
      </div>
    </main>
  );
}

function BlurMacro({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-16 text-sm">{label}</div>
      <div className="flex-1 h-3 bg-border rounded-full overflow-hidden">
        <div className={`h-full ${color} opacity-30`} style={{ width: '60%' }} />
      </div>
      <div className="w-12 h-4 bg-border rounded" />
    </div>
  );
}
