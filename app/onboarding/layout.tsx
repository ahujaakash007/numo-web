'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ONBOARDING_STEPS } from './steps';

// Question steps navigate with router.push(), which does NOT prefetch — so on
// mobile each "next" cold-fetched the next route (1–2s lag). Prefetch the whole
// funnel once on entry so every transition is instant.
export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    ONBOARDING_STEPS.forEach((s) => router.prefetch(`/onboarding/${s}`));
    router.prefetch('/plan');
    router.prefetch('/checkout/phone');
  }, [router]);
  return <>{children}</>;
}
