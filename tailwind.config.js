import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '370px',
      // => @media (min-width: 370px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        // Define your custom colors here
        primary: '#1da1f2',
        secondary: '#14171a',
        accent: '#657786',
        // More custom colors...
      },
      // Other customizations...
    },
  },
  // plugins: [
  //   daisyui,
  // ],
  // daisyui: {
  //   themes: false,
  // },
}
