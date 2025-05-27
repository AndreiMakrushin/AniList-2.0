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
    },
    fontFamily: {
      manropeM: ["Manrope", "Manrope-Medium"],
      manropeEB: ["Manrope", "Manrope-ExtraBold"],
      manropeEL: ["Manrope", "Manrope-ExtraLight"],
      manropeL: ["Manrope", "Manrope-Light"],
      manropeS: ["Manrope", "Manrope-SemiBold"],
      travels: ["Travels", "Travels"],
      travelsVariable: ["TravelsVariable"],
      soledago: ["Soledago", "Soledago"],
      roboto: ["Roboto"],
    },
    borderRadius: {
      "700": "43.75rem",
      "40": "2.5rem",
      "30": "1.875rem",
      "100": "6.25rem",
      "500": "31.25rem",
      "35": "2,1875rem",
      "20": "1.25rem",
      "10": "0.625rem",
      "5": "0.3125rem",
      "6": "0.375rem",
      "4": "0.25rem",
      "16": "1rem",
      "60": "3.75rem",
      "50": "3.125rem",
      "79": "4.9375rem",
      "78": "4.875rem",
      "69": "4.3125rem",
      "22": "1.375rem",
      "94": "5.875rem",
    },
    colors: {
      "green-text": "#8bb36c",
      "violet-text": "#a680be",
      "blue-text": "#6db1bf",
      "orange-text": "#dba155",
      "yellow-text": "#e2cc58",
      "pink-text": "#e28484",

      green: "#d7e5c8",
      orange: "#f7cd96",
      pink: "#ffc0c0",
      blue: "#c2e5ec",
      yellow: "#fff09f",
      violet: "#dac8e5",

      gray_90: "#b1b1b1",
      gray_80: "#e7e7e7",
      gray_70: "#f5f5f5",
      gray_60: "#fcfcfc",
      white: "#ffffff",
      "pink-bg/50": "#FFDFDF",
      "orange-bg/50": "#FBE6CB",

      "dark-blue": "#6DB1BF80",
      "border-blue": "#6DB1BF",
      "accent-red": "#df3838",

      "bg-blue-50": "rgba(194 229 236 / 0.5)",

      "black-40": "rgba(0 0 0 / 0.4)",
      "black-20": "rgba(0 0 0 / 0.2)",

      "blue-translucent-50": "rgba(194 229 236 / 0.5)",
      "white-translucent-20": "rgba(255 255 255 / 0.2)",
      "white-translucent-50": "rgba(255 255 255 / 0.5)",
    },
      
    },
  }}

