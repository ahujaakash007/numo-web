import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // "Steel & Haldi" — mirrors the mobile app's theme/colors.ts.
        // green*→haldi, coral*→clay, blue→teal (same remap as the app).
        bg: '#EEF1F2',
        surface: '#FFFFFF',
        surfaceAlt: '#F6F8F8',
        cream: '#F6F8F8',
        ink: '#161A1D',
        inkSoft: '#565D61',
        inkMuted: '#8A9296',
        border: '#E2E7E8',
        hairline: '#ECEFF0',
        green: '#E0902B',
        greenDeep: '#B5651D',
        greenBright: '#F0A53E',
        greenSoft: '#E0902B16',
        greenBorder: '#E0902B55',
        haldi: '#E0902B',
        haldiDeep: '#B5651D',
        clay: '#C0492F',
        teal: '#2F8F86',
        coral: '#C0492F',
        coralDeep: '#A23A24',
        peach: '#F2C98C',
        blue: '#2F8F86',
        gold: '#E0902B',
        warning: '#C0492F',
      },
      fontFamily: {
        sans: ['Hanken Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Bricolage Grotesque', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
