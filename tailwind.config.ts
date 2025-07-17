import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        offwhite: "#F2F2F2",
        accent: "#9B5DE5",
        secondary: "#4BC6E9",
        success: "#3EFF8B",
        danger: "#FF3C5F",
      },
    },
  },
  plugins: [],
} satisfies Config;
