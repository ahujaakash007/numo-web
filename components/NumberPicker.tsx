'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  min: number;
  max: number;
  value?: number;
  defaultValue?: number;
  onChange: (v: number) => void;
  suffix?: string;
}

const ITEM_HEIGHT = 56;
const VISIBLE_COUNT = 5; // odd number so the center item is well-defined

// Vertical scroll-snap number picker. Center item = selected.
// Mobile-friendly — feels like an iOS picker.
export function NumberPicker({ min, max, value, defaultValue, onChange, suffix }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const [internal, setInternal] = useState<number>(value ?? defaultValue ?? Math.round((min + max) / 2));
  const ignoreNextScroll = useRef(false);

  // Sync external value → scroll position
  useEffect(() => {
    if (value !== undefined && value !== internal) {
      setInternal(value);
      const el = scrollRef.current;
      if (el) {
        ignoreNextScroll.current = true;
        el.scrollTop = (value - min) * ITEM_HEIGHT;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Initial scroll on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      ignoreNextScroll.current = true;
      el.scrollTop = (internal - min) * ITEM_HEIGHT;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    if (ignoreNextScroll.current) { ignoreNextScroll.current = false; return; }
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / ITEM_HEIGHT);
    const next = Math.max(min, Math.min(max, min + idx));
    if (next !== internal) {
      setInternal(next);
      onChange(next);
    }
  };

  return (
    <div className="relative" style={{ height: ITEM_HEIGHT * VISIBLE_COUNT }}>
      {/* Highlighted center band */}
      <div
        className="absolute left-0 right-0 pointer-events-none z-10 border-y-2 border-green/30 bg-greenSoft/40"
        style={{
          top: ITEM_HEIGHT * Math.floor(VISIBLE_COUNT / 2),
          height: ITEM_HEIGHT,
        }}
      />

      {/* Top/bottom fade masks */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bg to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg to-transparent pointer-events-none z-10" />

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-full overflow-y-scroll scroll-smooth snap-y snap-mandatory no-scrollbar"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {/* Spacer at top so first number can reach center */}
        <div style={{ height: ITEM_HEIGHT * Math.floor(VISIBLE_COUNT / 2) }} />
        {numbers.map((n) => (
          <div
            key={n}
            className={`flex items-center justify-center snap-center transition-opacity ${
              n === internal ? 'opacity-100 font-bold text-ink' : 'opacity-40 text-inkSoft'
            }`}
            style={{ height: ITEM_HEIGHT, scrollSnapAlign: 'center' }}
          >
            <span className="text-4xl tabular-nums">{n}</span>
            {suffix && <span className="ml-2 text-lg text-inkSoft">{suffix}</span>}
          </div>
        ))}
        {/* Spacer at bottom */}
        <div style={{ height: ITEM_HEIGHT * Math.floor(VISIBLE_COUNT / 2) }} />
      </div>
    </div>
  );
}
