import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bgGradient: 'var(--bg-gradient)',
        bgColor: 'var(--bg-color)',
        bgColorBlur: 'var(--bg-color-blur)',
        shadowColor: 'var(--shadow-color)',
        borderColor: 'var(--border-color)',
        hoverBgColor: 'var(--hover-bg-color)',
        searchBgColor: 'var(--search-bg-color)',
        blueBorderColor: 'var(--blue-border-color)',
        textColor: 'var(--text-color)',
        lessTextColor: 'var(--less-text-color)',
        skeletonBgColor: 'var(--skeleton-bg-color)',
        skeletonShadowColor: 'var(--skeleton-shadow-color)',
      },
    },
  },
  plugins: [],
} satisfies Config;
