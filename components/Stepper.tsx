'use client';

export function Stepper({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1 px-6 pt-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full ${i < current ? 'bg-green' : 'bg-border'}`}
        />
      ))}
    </div>
  );
}
