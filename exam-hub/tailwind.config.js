/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Design system Exam Hub — voir docs/DESIGN_SYSTEM.md
        primary: '#1e293b',
        secondary: '#3b82f6',
        success: '#22c55e',
        danger: '#ef4444',
        warning: '#f59e0b',
        bg: '#f1f5f9',
        text: '#0f172a',
        'text-secondary': '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        h1: ['28px', { fontWeight: '700' }],
        h2: ['22px', { fontWeight: '600' }],
        body: ['16px', { fontWeight: '400' }],
        small: ['14px', { fontWeight: '400' }],
        label: ['12px', { fontWeight: '500' }],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(15, 23, 42, 0.06), 0 1px 3px 0 rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
