import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0F1E',
        surface: '#111827',
        surfaceHigh: '#1F2937',
        border: '#1E293B',
        primary: '#22D3EE',
        primaryDark: '#0891B2',
        secondary: '#818CF8',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        textPrimary: '#F1F5F9',
        textMuted: '#64748B',
        java: '#ED8936',
        spring: '#6DB33F',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '16px',
        pill: '999px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(34,211,238,0.15)',
        glowLg: '0 0 40px rgba(34,211,238,0.2)',
        card: '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
} satisfies Config;
