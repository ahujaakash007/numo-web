import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Mirrors the mobile app's theme/colors.ts exactly for visual parity.
        bg: '#FDF9F3',
        surface: '#FFFFFF',
        cream: '#F8F0E3',
        ink: '#1C1917',
        inkSoft: '#57534E',
        inkMuted: '#6F6861',
        border: '#EFE7DA',
        hairline: '#F4EEE3',
        green: '#2E7D32',
        greenDeep: '#1F5B23',
        greenBright: '#52A658',
        greenSoft: '#2E7D3212',
        greenBorder: '#2E7D3255',
        coral: '#F08A6E',
        coralDeep: '#E06A4A',
        peach: '#FCD9B0',
        blue: '#7AAED9',
        gold: '#E9A23B',
        warning: '#C8451C',
      },
      fontFamily: {
        sans: ['Instrument Sans', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
