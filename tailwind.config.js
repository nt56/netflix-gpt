/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        display: ["'Outfit'", "'Plus Jakarta Sans'", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#7C3AED",
          hover: "#8B5CF6",
        },
        dark: {
          950: "#060608",
          900: "#0D0D11",
          850: "#121217",
          800: "#181820",
          700: "#22222E",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cinema-vignette":
          "radial-gradient(circle at center, transparent 30%, rgba(6, 6, 8, 0.85) 100%)",
      },
      boxShadow: {
        glow: "0 0 25px rgba(124, 58, 237, 0.45)",
        "glow-lg": "0 0 45px rgba(124, 58, 237, 0.65)",
        "glow-purple": "0 0 35px rgba(147, 51, 234, 0.5)",
        "card-hover": "0 20px 40px -15px rgba(124, 58, 237, 0.35)",
      },
      animation: {
        fadeIn: "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        fadeInUp: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        fadeInDown: "fadeInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        scaleIn: "scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
