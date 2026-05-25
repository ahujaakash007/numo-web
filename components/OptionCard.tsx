'use client';

interface Props {
  label: string;
  hint?: string;
  selected?: boolean;
  onClick: () => void;
}

export function OptionCard({ label, hint, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border-2 transition ${
        selected ? 'border-green bg-greenSoft' : 'border-border bg-surface'
      }`}
    >
      <div className="font-semibold text-lg text-ink">{label}</div>
      {hint && <div className="text-sm text-inkSoft mt-0.5">{hint}</div>}
    </button>
  );
}
