/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F15A29",      // Laranja do botão
        secondary: "#009FE3",    // Azul do logo
        accent: "#F6F2F2",       // Fundo claro
        dark: "#222222",          // Texto escuro
        darkLight: "#1D1D1D",        // Texto moderado
        gray: "#BDBDBD",         // Cinza dos ícones/inputs
        white: "#FFFFFF",
        grayScale: "#666666",
        primartLight: "#F5EAEA"
      }
    },
  },
  plugins: [],
}

