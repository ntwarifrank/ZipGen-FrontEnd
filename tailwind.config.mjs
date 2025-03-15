/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        colors: {
          primaryBlue: "var(--primary-blue)",  // Bright Blue
          accentPurple: "var(--accent-purple)", // Vibrant Purple
          backgroundDark: "var(--background-dark)", // Dark Greyish Blue
          textLight: "var(--text-light)", // White
        },
    },
  },
  plugins: [],
};
