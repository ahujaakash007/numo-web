// Mifflin–St Jeor BMR + activity factor + pace adjustment, per PRD §7.4.

export type Goal = 'lose' | 'maintain' | 'gain';
export type Gender = 'male' | 'female';
export type WorkoutBand = '0' | '1-2' | '3-4' | '5+';

const ACTIVITY_FACTOR: Record<WorkoutBand, number> = {
  '0': 1.2,
  '1-2': 1.375,
  '3-4': 1.55,
  '5+': 1.725,
};

const KCAL_PER_KG_FAT = 7700;

export interface PlanInput {
  gender: Gender;
  age: number;
  height_cm: number;
  weight_kg: number;
  goal: Goal;
  pace_kg_per_week: number;
  workouts: WorkoutBand;
}

export interface PlanOutput {
  bmr: number;
  tdee: number;
  daily_kcal: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
  weekly_delta_kcal: number;
  floorApplied: boolean;
  warning?: string;
}

export function computeBmr(input: Pick<PlanInput, 'gender' | 'weight_kg' | 'height_cm' | 'age'>): number {
  const base = 10 * input.weight_kg + 6.25 * input.height_cm - 5 * input.age;
  return input.gender === 'male' ? base + 5 : base - 161;
}

export function computePlan(input: PlanInput): PlanOutput {
  const bmr = computeBmr(input);
  const tdee = bmr * ACTIVITY_FACTOR[input.workouts];

  const dailyAdjustment = (input.pace_kg_per_week * KCAL_PER_KG_FAT) / 7;
  let raw: number;
  if (input.goal === 'lose') raw = tdee - dailyAdjustment;
  else if (input.goal === 'gain') raw = tdee + dailyAdjustment;
  else raw = tdee;

  const floor = input.gender === 'male' ? 1500 : 1200;
  const floorApplied = raw < floor;
  const daily_kcal = Math.max(floor, Math.round(raw));

  // 30P / 40C / 30F default split (kcal/g: 4, 4, 9).
  const protein_g = Math.round((daily_kcal * 0.3) / 4);
  const carbs_g = Math.round((daily_kcal * 0.4) / 4);
  const fats_g = Math.round((daily_kcal * 0.3) / 9);

  const weekly_delta_kcal = (daily_kcal - tdee) * 7;

  let warning: string | undefined;
  if (floorApplied) {
    warning =
      'Your chosen pace would drop below the safe minimum. We have raised your daily target to the minimum recommended floor.';
  }

  return { bmr: Math.round(bmr), tdee: Math.round(tdee), daily_kcal, protein_g, carbs_g, fats_g, weekly_delta_kcal, floorApplied, warning };
}

export function projectedWeeksToGoal(currentKg: number, goalKg: number, paceKgPerWeek: number): number {
  if (paceKgPerWeek <= 0) return 0;
  return Math.max(1, Math.ceil(Math.abs(currentKg - goalKg) / paceKgPerWeek));
}

export function projectedGoalDate(currentKg: number, goalKg: number, paceKgPerWeek: number, from = new Date()): Date {
  const weeks = projectedWeeksToGoal(currentKg, goalKg, paceKgPerWeek);
  const d = new Date(from);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}
