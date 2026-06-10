'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ONBOARDING_STEPS, type StepSlug } from './steps';
import { gaEvent } from '@/lib/ga';

// Question steps navigate with router.push(), which does NOT prefetch — so on
// mobile each "next" cold-fetched the next route (1–2s lag). Prefetch the whole
// funnel once on entry so every transition is instant.
export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    ONBOARDING_STEPS.forEach((s) => router.prefetch(`/onboarding/${s}`));
    router.prefetch('/plan');
    router.prefetch('/checkout/phone');
  }, [router]);

  // Per-step view event → GA4 funnel exploration shows exactly which question
  // users drop on (the last step viewed is the drop point).
  useEffect(() => {
    const step = pathname?.split('/').pop();
    if (!step) return;
    gaEvent('onboarding_step_viewed', {
      step,
      step_index: ONBOARDING_STEPS.indexOf(step as StepSlug),
    });
  }, [pathname]);

  return <>{children}</>;
}
