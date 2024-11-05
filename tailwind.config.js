/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'screen-md': '15.6in', // Custom max width for medium screens
        'screen-lg': '23.8in',  // Custom max width for large screens
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#570df8",
          "secondary": "#f000b8",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          // Add more custom colors if needed
        },
      },
      "light",  // Ensure light theme is active
    ],
    darkTheme: false, // Disable automatic dark theme
  },
};
