import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"], // Support du mode sombre via une classe
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "hsl(var(--foreground))",
        background: "hsl(var(--background))",
        "background-light": "hsl(var(--background-light))",
        "background-dark": "hsl(var(--background-dark))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          light: "hsl(var(--secondary-light))",
          dark: "hsl(var(--secondary-dark))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        third: {
          DEFAULT: "hsl(var(--third))",
          light: "hsl(var(--third-light))",
          dark: "hsl(var(--third-dark))",
        },
        fourth: {
          DEFAULT: "hsl(var(--fourth))",
          light: "hsl(var(--fourth-light))",
          dark: "hsl(var(--fourth-dark))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",
          dark: "hsl(var(--gold-dark))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        bodoni: ['"Bodoni Moda"', 'serif'],
        outfit: ['"Outfit"', 'sans-serif'],
      },
      animation: {
        "fade-left": "fadeLeft 0.5s ease-out",
      },
      keyframes: {
        fadeLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" }, // Commence à gauche et invisible
          "100%": { opacity: "1", transform: "translateX(0)" }, // Fin à sa place avec visibilité
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Plugin pour animations si nécessaire
} satisfies Config;
