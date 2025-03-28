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
      
    },
  }}

