'use client';

import { Stepper } from './Stepper';

interface Props {
  step?: number;
  total?: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Screen({ step, total, title, subtitle, children, footer }: Props) {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto">
      {step !== undefined && total !== undefined && <Stepper current={step} total={total} />}
      <div className="flex-1 px-6 pt-8 pb-4 flex flex-col">
        <h1 className="text-3xl font-serif font-semibold text-ink leading-tight tracking-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-base text-inkSoft">{subtitle}</p>}
        <div className="mt-8 flex-1">{children}</div>
      </div>
      {footer && <div className="px-6 pb-8 sticky bottom-0 bg-bg">{footer}</div>}
    </div>
  );
}
