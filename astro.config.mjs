import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: vercel(
    { edgeMiddleware: true }
  ),
  integrations: [react(), tailwind()],
  devToolbar: { enabled: false }
});