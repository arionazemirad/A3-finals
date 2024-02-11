/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js}"],
  plugins: [require("daisyui")], // DaisyUI should be included here
  theme: {
    extend: {},
  },
}
