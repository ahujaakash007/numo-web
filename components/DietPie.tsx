'use client';

// 80/20 donut: 80% "Diet" (green) + 20% "Exercise" (peach).
const SIZE = 200;
const STROKE = 26;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;
const GAP = 6;
const dietLen = C * 0.8;
const exLen = C * 0.2;

export function DietPie() {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE}>
          {/* Exercise 20% */}
          <circle
            cx={SIZE / 2} cy={SIZE / 2} r={R}
            fill="none" stroke="#FCD9B0" strokeWidth={STROKE}
            strokeDasharray={`${Math.max(0, exLen - GAP)} ${C - exLen + GAP}`}
            strokeDashoffset={-(dietLen + GAP / 2)}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
          {/* Diet 80% */}
          <circle
            cx={SIZE / 2} cy={SIZE / 2} r={R}
            fill="none" stroke="#2E7D32" strokeWidth={STROKE}
            strokeDasharray={`${dietLen - GAP} ${C - dietLen + GAP}`}
            strokeDashoffset={-(GAP / 2)}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-extrabold text-ink leading-none">80%</div>
          <div className="text-sm text-inkMuted mt-1">is your diet</div>
        </div>
      </div>
      <div className="flex justify-center gap-6 text-sm text-inkMuted">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green inline-block" />Diet · 80%</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: '#FCD9B0' }} />Exercise · 20%</span>
      </div>
    </div>
  );
}
