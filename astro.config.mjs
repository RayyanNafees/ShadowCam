import { defineConfig } from 'astro/config';
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [image(), tailwind()],
  output: "server",
  adapter: vercel()
});