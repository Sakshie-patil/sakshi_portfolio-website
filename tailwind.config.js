/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html"],
  theme: {
    extend: {
      borderRadius: {
        'bl-xxl': '9000px', // 👈 custom bottom-left radius
      }
    },
  },
  plugins: [],
}
