const config = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        eqGlow: {
          "0%, 100%": { "box-shadow": "0 0 0 rgba(0,0,0,0)" },
          "50%": { "box-shadow": "0 0 15px rgba(255,255,255,0.6)" },
        },
      },
      animation: {
        eqGlow: "eqGlow 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
