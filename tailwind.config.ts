import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FFF8F0',
        surface: '#FFFFFF',
        cream: '#FAF1E3',
        ink: '#1A1A1A',
        inkSoft: '#4A4A4A',
        inkMuted: '#8A8A8A',
        border: '#E8E0D2',
        green: '#2E7D32',
        greenSoft: '#2E7D3214',
        greenBorder: '#2E7D3266',
        coral: '#F08A6E',
        peach: '#FCD9B0',
        blue: '#7AAED9',
        warning: '#C8451C',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
