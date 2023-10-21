/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#800bc4",
        "secondary": "#9b59b6", 
        "accent": "#e67e22",
        "error": "#e74c3c",
        "success": "#2ecc71",
        "dark": "#121212",
        "light": "#ffffff",
      }
    },
    plugins: [],
  }
};