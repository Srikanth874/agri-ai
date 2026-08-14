import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: "#FFF8F0",
          100: "#FFF0DB",
          200: "#FFE0B8",
          300: "#FFCF8A",
          400: "#FFB84D",
          500: "#FF9933", // Indian flag saffron
          600: "#E07800",
          700: "#B85E00",
          800: "#8A4700",
          900: "#5C2F00",
        },
        agri: {
          50: "#F0FFF4",
          100: "#DCFFE8",
          200: "#A8F0C0",
          300: "#6EDB8E",
          400: "#38C65E",
          500: "#138808", // Indian flag green
          600: "#0F6E06",
          700: "#0B5405",
          800: "#073B03",
          900: "#042202",
        },
        navy: {
          50: "#F0F4FF",
          100: "#E0E8FF",
          200: "#C0D0FF",
          300: "#8BA4F0",
          400: "#5B7BE0",
          500: "#000080", // Indian flag navy
          600: "#00006A",
          700: "#000055",
          800: "#000040",
          900: "#00002B",
        },
        cream: {
          50: "#FFFEF8",
          100: "#FFFDF0",
          200: "#FFFAE0",
          300: "#FFF7D0",
          400: "#FFF3B8",
          500: "#FFF0A0",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-tricolor":
          "linear-gradient(180deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #0a1f0a 0%, #132b13 30%, #1a3a1a 60%, #0d2b0d 100%)",
        "gradient-saffron":
          "linear-gradient(135deg, #FF9933 0%, #FFB84D 100%)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        pulse_glow: "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,153,51,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255,153,51,0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
