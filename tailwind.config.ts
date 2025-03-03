import type { Config } from "tailwindcss";

import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
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
        "243": "243px",
        "110": "110px",
        "131": "131px",
        "108": "108px",
        "101": "101px",
        "120": "120px",
        "356": "356px",
        "355": "355px",
        "380": "380px",
        "383": "383px",
        "228": "228px",
        "916": "916px",
        "48": "48px",
        "72": "72px",
        "886": "886px",
        "790": "790px",
        "297": "297px",
        "692": "692px",
        "632": "632px",
        "305": "305px",
        "222.5": "222.5px",
        "409": "409px",
        "506": "506px",
        "584": "584px",
        "208": "208px",
        "463": "463px",
        "174": "174px",
        "160": "160px",
        "253": "253px",
        "636": "636px",
        "588": "588px",
        "179": "179px",
        "330": "330px",
        "1248": "1248px",
        "600": "600px",
        "252.8": "252.8px",
        "255": "255px",
        "143": "143px",
        "192": "192px",
        "165": "165px",
        "272": "272px",
      },
      height: {
        "52": "52px",
        "18": "18px",
        "26": "26px",
        "37": "37px",
        "42": "42px",
        "50": "50px",
        "53": "53px",
        "56": "56px",
        "69": "69px",
        "48": "48px",
        "45": "45px",
        "216": "216px",
        "74": "74px",
        "77": "77px",
        "393": "393px",
        "241": "241px",
        "250": "250px",
        "265": "265px",
        "420": "420px",
        "333": "333px",
        "104": "104px",
        "404": "404px",
        "204": "204px",
        "502": "502px",
        "116": "116px",
        "68": "68px",
        "88": "88px",
        "34": "34px",
        "816": "816px",
        "724": "724px",
        "277": "277px",
        "200": "200px",
        "293": "293px",
        "375": "375px",
        "197": "197px",
        "694": "694px",
        "152": "152px",
        "78": "78px",
        "46": "46px",
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
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".line-clamp-10": {
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "10",
          overflow: "hidden",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
export default config;
