'use client';

// Two descending weight curves over ~6 months: a steep "with Numo" line that
// drops ~2× more than the shallow "not tracking" line.
const W = 300;
const H = 160;
const PAD_TOP = 12;
const USABLE = H - PAD_TOP - 8;
const MONTHS = 6;

const ease = (t: number) => 1 - Math.pow(1 - t, 1.6);

function pts(scale: number) {
  const arr: string[] = [];
  for (let i = 0; i <= MONTHS; i++) {
    const x = (i / MONTHS) * W;
    const y = PAD_TOP + ease(i / MONTHS) * scale * USABLE;
    arr.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return arr;
}

export function WeightFallGraph() {
  const numo = pts(1);
  const track = pts(0.5);
  const area = `${numo.join(' ')} ${W},${PAD_TOP + USABLE} 0,${PAD_TOP + USABLE}`;
  const end = numo[numo.length - 1].split(',').map(Number);

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="wf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2E7D32" stopOpacity="0.18" />
            <stop offset="1" stopColor="#2E7D32" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1={PAD_TOP + USABLE} x2={W} y2={PAD_TOP + USABLE} stroke="#E8E0D2" strokeWidth="1" />
        <polygon points={area} fill="url(#wf)" />
        <polyline points={track.join(' ')} fill="none" stroke="#8A8A8A" strokeWidth="2.5" strokeDasharray="6 6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={numo.join(' ')} fill="none" stroke="#2E7D32" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={end[0]} cy={end[1]} r="5" fill="#2E7D32" />
      </svg>
      <div className="flex justify-center gap-6 mt-3 text-sm text-inkMuted">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green inline-block" />With Numo (4+ days/wk)</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-inkMuted inline-block" />Not tracking</span>
      </div>
    </div>
  );
}
