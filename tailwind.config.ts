import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "app.vue",
    "app/routes/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "pages/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "shared/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "widgets/**/*.{vue,js,jsx,mjs,ts,tsx}",
  ],

  darkMode: ["selector", '[class*="app-dark"]'],
  theme: {
    extend: {
      screens: {
        pads: "1150px",
        smallPads: "751px",
        mediumPads: "800px",
        mobile: "500px",
        notebooks: "1500px",
      },
      boxShadow: {
        'shadowDrop': '0 20px 40px 0 rgba(0,0,0,.3)'
    },
    transitionDuration: {
        'short': '0.3s'
    },
    backgroundColor: {
        'cardOpacity': 'rgba(0, 0, 0, 0.8)',
        'cardOpacity2': 'rgba(0, 0, 0, 0.3)'
    },animation: {
      shimmer: 'shimmer 2s infinite linear',
    },
    keyframes: {
      shimmer: {
        '0%': { 'background-position': '-200% 0' },
        '100%': { 'background-position': '200% 0' },
      },
    },
    backgroundSize: {
      '200%': '200% 100%',
    }
      
    },
  }}

