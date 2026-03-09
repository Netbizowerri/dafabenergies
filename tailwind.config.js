/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#06294d",
          forest: "#0f7a4f",
          gold: "#e6ab33",
          sand: "#f5efe4",
          mist: "#f7faf7",
          ink: "#17324d",
        },
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        glow: "0 24px 80px rgba(6, 41, 77, 0.15)",
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at top, rgba(230, 171, 51, 0.26), transparent 35%), radial-gradient(circle at 80% 20%, rgba(15, 122, 79, 0.18), transparent 30%), linear-gradient(180deg, rgba(255,255,255,1), rgba(245,239,228,0.75))",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
