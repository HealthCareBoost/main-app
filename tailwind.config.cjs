/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // false, "class", "media"
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    //   screens: {
    //     sm: "640px",
    //     md: "768px",
    //     lg: "1024px",
    //     xl: "1280px",
    //     "2xl": "1536px",
    //   },
    //   colors: {
    //     transparent: "transparent",
    //     current: "currentColor",
    //     white: "#ffffff",
    //     tahiti: {
    //       100: "#cffafe",
    //       200: "#a5f3fc",
    //       300: "#67e8f9",
    //       400: "#22d3ee",
    //       500: "#06b6d4",
    //       600: "#0891b2",
    //       700: "#0e7490",
    //       800: "#155e75",
    //       900: "#164e63",
    //     },
    //   },
    //   fontFamily: {
    //     sans: ["Graphik", "sans-serif"],
    //     serif: ["Merriweather", "serif"],
    //   },
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        primaryDark: "#00040f",
        bgDark: "#121212",
        secondaryBlue: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimDark: "rgba(64, 64, 64, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  safelist: ["bg-white-gradient"],
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    // require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
