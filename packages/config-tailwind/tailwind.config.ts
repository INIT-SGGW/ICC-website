import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#241E4A",
          200: "#211839"
        },
        cred: "#FF0000",
      }
    },
  },
  plugins: [],
};
export default config;
