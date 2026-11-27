/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        display: ["'Outfit'", "'Plus Jakarta Sans'", "sans-serif"],
        cinematic: ["'Bebas Neue'", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#E50914",
          hover: "#F40612",
          dark: "#B81D24",
          subtle: "rgba(229, 9, 20, 0.15)",
        },
        dark: {
          950: "#060608",
          900: "#0D0D11",
          850: "#121217",
          800: "#181820",
          700: "#22222E",
          600: "#2F2F3D",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cinema-vignette":
          "radial-gradient(circle at center, transparent 30%, rgba(6, 6, 8, 0.85) 100%)",
        "hero-gradient":
          "linear-gradient(180deg, rgba(6, 6, 8, 0.3) 0%, rgba(6, 6, 8, 0.7) 65%, #060608 100%)",
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #E50914 0deg, #9333EA 120deg, #3B82F6 240deg, #E50914 360deg)",
      },
      boxShadow: {
        glow: "0 0 25px rgba(229, 9, 20, 0.45)",
        "glow-lg": "0 0 45px rgba(229, 9, 20, 0.65)",
        "glow-purple": "0 0 35px rgba(147, 51, 234, 0.5)",
        "glow-cyan": "0 0 35px rgba(6, 182, 212, 0.4)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.8)",
        "card-hover": "0 20px 40px -15px rgba(229, 9, 20, 0.35)",
      },
      animation: {
        fadeIn: "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        fadeInUp: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        fadeInDown: "fadeInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        pulseGlow: "pulseGlow 2.5s infinite ease-in-out",
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2s infinite linear",
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
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(229, 9, 20, 0.35)",
            filter: "brightness(1)",
          },
          "50%": {
            boxShadow: "0 0 35px rgba(229, 9, 20, 0.75)",
            filter: "brightness(1.15)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
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
