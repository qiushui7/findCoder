import type { Config } from "tailwindcss";

export default {
  darkMode: ['class'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgGradient: "var(--bg-gradient)",
        bgColor: "var(--bg-color)",
        shadowColor: "var(--shadow-color)",
        borderColor: "var(--border-color)",
        hoverBgColor: "var(--hover-bg-color)",
        searchBgColor: "var(--search-bg-color)",
      },
    },
  },
  plugins: [],
} satisfies Config;
