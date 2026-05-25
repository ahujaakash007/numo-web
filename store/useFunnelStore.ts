'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Goal, Gender, WorkoutBand } from '@/lib/calorieMath';

export type MealsBand = '1' | '2' | '3' | '4' | '5+';
export type HabitChange =
  | 'less_sugar' | 'less_junk' | 'stop_binge' | 'more_greens' | 'less_stress_eating' | 'cook_more';
export type PriorExperience = 'new' | 'tried_quit' | 'currently_counting';

export interface FunnelState {
  goal?: Goal;
  gender?: Gender;
  age?: number;
  height_cm?: number;
  weight_kg?: number;
  goal_weight_kg?: number;
  pace_kg_per_week?: number;
  workouts?: WorkoutBand;
  meals_per_day?: MealsBand;
  habit_changes: HabitChange[];
  prior_experience?: PriorExperience;
  name?: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_medium?: string;
}

interface FunnelActions {
  set: <K extends keyof FunnelState>(key: K, value: FunnelState[K]) => void;
  toggleHabit: (h: HabitChange) => void;
  captureUtms: (params: URLSearchParams) => void;
  reset: () => void;
}

const initial: FunnelState = { habit_changes: [] };

const safeStorage = () => {
  if (typeof window === 'undefined') {
    return { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  }
  return window.localStorage;
};

export const useFunnelStore = create<FunnelState & FunnelActions>()(
  persist(
    (set, get) => ({
      ...initial,
      set: (key, value) => set({ [key]: value } as Partial<FunnelState>),
      toggleHabit: (h) => {
        const cur = get().habit_changes;
        set({ habit_changes: cur.includes(h) ? cur.filter((x) => x !== h) : [...cur, h] });
      },
      captureUtms: (params) => {
        const u: Partial<FunnelState> = {};
        const src = params.get('utm_source'); if (src) u.utm_source = src;
        const camp = params.get('utm_campaign'); if (camp) u.utm_campaign = camp;
        const cont = params.get('utm_content'); if (cont) u.utm_content = cont;
        const med = params.get('utm_medium'); if (med) u.utm_medium = med;
        set(u);
      },
      reset: () => set({ ...initial }),
    }),
    {
      name: 'numo:funnel',
      storage: createJSONStorage(() => safeStorage() as Storage),
    }
  )
);
