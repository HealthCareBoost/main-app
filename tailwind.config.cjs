/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // false, "class", "media"
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  // content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
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
        blackGradient:
          "linear-gradient(144.39deg, #ffffff -278.56%, #6d6d6d -78.47%, #11101d 91.61%);",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
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
