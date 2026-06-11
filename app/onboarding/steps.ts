// Single source of truth for step order — used by all step screens to
// derive previous/next routes.

export const ONBOARDING_STEPS = [
  'name',
  'goal',
  'gender',
  'age',
  'height',
  'weight',
  'goal-weight',
  'engagement-1',
  'pace',
  'obstacles',
  'diet',
  'workouts',
  'engagement-2',
  'habits',
  'experience',
  'trust',
  'engagement-3',
] as const;

export type StepSlug = (typeof ONBOARDING_STEPS)[number];

export function nextStep(current: StepSlug): string {
  const i = ONBOARDING_STEPS.indexOf(current);
  if (i === -1 || i === ONBOARDING_STEPS.length - 1) return '/plan';
  return `/onboarding/${ONBOARDING_STEPS[i + 1]}`;
}

export function stepIndex(slug: StepSlug): number {
  return ONBOARDING_STEPS.indexOf(slug) + 1;
}

export const TOTAL_STEPS = ONBOARDING_STEPS.length;
