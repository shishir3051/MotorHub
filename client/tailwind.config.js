
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: 'rgb(var(--color-bg) / <alpha-value>)',
          card: 'rgb(var(--color-card) / <alpha-value>)',
          border: 'rgb(var(--color-border) / <alpha-value>)',
          text: 'rgb(var(--color-text) / <alpha-value>)',
          muted: 'rgb(var(--color-muted) / <alpha-value>)'
        },
        accent: {
          primary: '#FF6B35',
          secondary: '#F7931E',
          dark: '#D32F2F'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif']
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-in-out',
        slideUp: 'slideUp 0.6s ease-out',
        slideInLeft: 'slideInLeft 0.8s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 3s linear infinite',
        cartBounce: 'cartBounce 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        toastSlide: 'toastSlide 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        heartPop: 'heartPop 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        navGlow: 'navGlow 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' }
        },
        cartBounce: {
          '0%, 100%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.4)' },
          '70%': { transform: 'scale(0.85)' },
        },
        toastSlide: {
          '0%': { transform: 'translateX(110%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        heartPop: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.35)' },
        },
        navGlow: {
          '0%': { boxShadow: 'none' },
          '100%': { boxShadow: '0 1px 0 0 rgba(255,107,53,0.15), 0 4px 20px 0 rgba(0,0,0,0.6)' }
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        'accent-glow': '0 0 20px rgba(255, 107, 53, 0.35)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,107,53,0.15)',
      },
      backdropBlur: {
        xs: '2px',
      }
    }
  },
  plugins: []
}