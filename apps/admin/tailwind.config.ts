// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
import typography from "@tailwindcss/typography";

const config: Pick<Config, "content" | "presets" | "plugins"> = {
  content: ["./src/**/*.{tsx,ts}"],
  presets: [sharedConfig],
  plugins: [typography],
};

export default config;
