/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0C0C0C",
        surface: "#121316",
        primary: "#00D4FF",
        secondary: "#7C3AED",
        success: "#10B981",
        text: "#D7E2EA",
        muted: "#7A8A96",
      },
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 50% 0%, rgba(0,212,255,0.12), transparent 55%)",
        "node-grid":
          "linear-gradient(rgba(215,226,234,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(215,226,234,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      boxShadow: {
        glow: "0 0 24px rgba(0,212,255,0.35)",
        "glow-violet": "0 0 24px rgba(124,58,237,0.35)",
        "glow-success": "0 0 24px rgba(16,185,129,0.35)",
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "pulse-node": "pulse-node 2.4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-node": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(0,212,255,0.55)" },
          "50%": { boxShadow: "0 0 0 10px rgba(0,212,255,0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
    },
  },
  plugins: [],
};
