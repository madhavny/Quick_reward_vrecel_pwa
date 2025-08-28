import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: false,
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        scanline: 'scanline 2s linear infinite alternate',
      },
      colors: {
        foreground: "hsl(var(--foreground))", // or just your hex
      },
    },
  },
  plugins: [flowbitePlugin],
};
