/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")], 
  theme: {
    extend: {
      fontFamily: {
        "l-regular": "Lexend_regular",
        "l-bold": "Lexend_bold",
        "l-medium": "Lexend_medium",
        "l-semibold": "Lexend_semibold",
        "l-thin": "Lexend_thin",
      },
      primary: "bg-cyan-500",
      backgroundColor: {
         "light" : "#FFFFFF",
         "dark" : "#010111",
         "primary" : "#0ea5e9",
         "input-light" : "#ffffff",
         "input-dark" : "#1f2937",
      },

    
   textColor: {
        "light-title" : "#010111",
        "light-subtitle" : "#4B4B4B",
        "dark-title" : "#FFFFFF",
        "dark-subtitle" : "#C1C1C1",
        "light-body" : "#4B4B4B",
        "dark-body" : "#E5E7EB",
        "primary" : "#0ea5e9",
      

      },

      fontSize: {
        "base" : "14px",
        "lg" : "17px",
        "xl" : "19px",
      }
      
    },
  },
  plugins: [],
};