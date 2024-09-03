/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        swing: {
          "0%": { transform: "rotate(0deg)" }, // Início e fim do ciclo, com rotação positiva
          "100%": { transform: "rotate(360deg)" }, // Meio do ciclo, com rotação negativa
        },
      },
      animation: {
        swing: "swing 4s ease-in-out infinite", // Define a animação como infinita
      },
    },
  },

  plugins: [],
};
