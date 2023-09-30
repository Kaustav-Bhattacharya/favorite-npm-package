/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      loader: {
        'spinner': 'animate-spin border-t-2 border-blue-500 border-solid rounded-full',
      },
    },
  },
  plugins: [],
};
