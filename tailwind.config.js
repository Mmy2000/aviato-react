/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        marquee: {
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
        flashing: {
          '0%, 100%': { opacity: '0.2' },
          '20%': { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration) linear infinite",
        "fade-in": "fade-in 0.5s linear forwards",
        flashing: "flashing 1.4s infinite linear",
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

