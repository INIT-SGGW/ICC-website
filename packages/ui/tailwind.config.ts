import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
import typography from "@tailwindcss/typography";

const config: Pick<Config, "prefix" | "presets" | "content" | "plugins"> = {
  content: ["./src/**/*.tsx"],
  presets: [sharedConfig],
  plugins: [typography],
};

export default config;
