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
      width: {
        "1440": "1440px",
        "1296": "1296px",
        "483": "483px",
        "461": "461px",
        "432": "432px",
        "544": "544px",
        "170": "170px",
        "265": "265px",
        "244": "244px",
        "110": "110px",
        "131": "131px",
        "108": "108px",
        "101": "101px",
        "356": "356px",
        "380": "380px",
        "916": "916px",
        "48": "48px",
        "886": "886px",
        "790": "790px",
        "297": "297px",
        "222.5": "222.5px",
      },
      height: {
        "56": "56px",
        "48": "48px",
        "45": "45px",
        "216": "216px",
        "74": "74px",
        "393": "393px",
        "241": "241px",
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
      fontFamily: {
        space_grotesk: ["var(--font-space_grotesk)"],
      },
    },
  },
  plugins: [],
};
export default config;
