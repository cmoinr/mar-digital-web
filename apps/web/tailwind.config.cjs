/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,md,mdx,js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,astro}",
  ],
  // Safelist for dynamically generated classes
  safelist: [
    "opacity-0",
    "opacity-100",
    "translate-x-0",
    "translate-x-1",
    "scale-105",
    "scale-110",
    "backdrop-blur-xl",
    "backdrop-blur-lg",
    "backdrop-blur",
  ],
  // Important for iOS/Safari support
  important: false,
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2E6AFF",
          dark: "#1B47A8",
          light: "#E2ECFF",
        },
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
          "100%": { transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(46,106,255,0.4)" },
          "50%": { boxShadow: "0 0 0 6px rgba(46,106,255,0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up .6s cubic-bezier(.16,.8,.35,1) forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "scale-in": "scale-in .5s ease forwards",
      },
    },
  },
  plugins: [],
};
