/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#0d6efd",
      danger: "#ff0000",
      warning: "#ffc107",
      "primary-hover": "#1766da",
      gray: "#efefef",
      light: "#fff",
      dialog: "rgba(0, 0, 0, 0.6)",
    },
    container: {
      center: true,
      screens: {
        DEFAULT: "95%",
        sm: "95%",
        lg: "1000px",
        xl: "1000px",
        "2xl": "1000px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Montserrat"],
      },
    },
  },
  plugins: [],
};
