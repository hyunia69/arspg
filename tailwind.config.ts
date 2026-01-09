import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Linear-inspired dark theme colors
        background: {
          DEFAULT: '#0a0a0b',
          secondary: '#111113',
          tertiary: '#18181b',
          elevated: '#1c1c1f',
        },
        foreground: {
          DEFAULT: '#fafafa',
          secondary: '#a1a1aa',
          tertiary: '#71717a',
          muted: '#52525b',
        },
        border: {
          DEFAULT: '#27272a',
          secondary: '#3f3f46',
          focus: '#5046e5',
        },
        accent: {
          DEFAULT: '#5046e5',
          hover: '#6366f1',
          muted: '#5046e5/20',
        },
        success: {
          DEFAULT: '#22c55e',
          muted: '#22c55e/20',
        },
        warning: {
          DEFAULT: '#f59e0b',
          muted: '#f59e0b/20',
        },
        error: {
          DEFAULT: '#ef4444',
          muted: '#ef4444/20',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(80, 70, 229, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(80, 70, 229, 0.5)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to bottom, rgba(80, 70, 229, 0.1), transparent)',
        'card-gradient': 'linear-gradient(to bottom right, rgba(80, 70, 229, 0.05), transparent)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(80, 70, 229, 0.3)',
        'glow-lg': '0 0 40px rgba(80, 70, 229, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(80, 70, 229, 0.1)',
      },
    },
  },
  plugins: [],
}

export default config
