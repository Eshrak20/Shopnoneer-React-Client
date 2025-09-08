/** @type {import('tailwindcss').Config} */
export default {
  // content: [
  //   "./index.html",
  //   "./src/**/*.{js,ts,jsx,tsx}",
  // ],
  purge: {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  safelist: [
    'loading', 
    'loading-bars', 
    'loading-lg', 
    'loading-spinner', 
    'loading-ring', 
    'loading-dots', 
    'loading-ball'
  ],
},
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#570df8",
          "secondary": "#f000b8",
          "accent": "#37cdbe", // Change if you want accent to match teal
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "success": "#53D2A6", // Add custom teal for success
        },
      },
      "light", // Ensure light theme is active
    ],
    darkTheme: false, // Disable automatic dark theme
    
  },
};
