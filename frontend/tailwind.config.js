export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#07111f',
        panel: 'rgba(12, 18, 32, 0.72)',
        line: 'rgba(255, 255, 255, 0.12)',
        glow: '#67e8f9',
        mint: '#76f7bf',
        coral: '#ff8a7a'
      },
      boxShadow: {
        glass: '0 24px 80px rgba(0, 0, 0, 0.34)',
        lift: '0 18px 45px rgba(5, 10, 22, 0.35)'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' }
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s linear infinite'
      }
    }
  },
  plugins: []
};
