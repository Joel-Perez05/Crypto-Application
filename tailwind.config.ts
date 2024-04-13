import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "501px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1300px",
        "2xl": "1440px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "custom-dark1": "rgb(30, 30, 40)",
        "custom-dark2": "rgb(20, 20, 30)",
        "custom-asset1": "rgb(33, 33, 64)",
        "custom-asset2": "rgb(20, 20, 35)",
      },
    },
  },
  plugins: [],
};
export default config;
