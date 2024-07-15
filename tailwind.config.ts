import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
       dark:"#202123",
       middle: "#343541",
       bright: "#444654",
       grayFP: "#9A9B9F",
       grayIc: "#C5C5D1",
       bGray: "#ECECF1",
       accGreen: "#0FA47F",
       darkGreen: "#00897B",
       lightGreen: "#8DCDB8",
       blue: "#5536DA"
      }
    },
  },
  plugins: [],
};
export default config;
