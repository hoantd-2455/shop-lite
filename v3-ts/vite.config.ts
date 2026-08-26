import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL("./index.html", import.meta.url)),
        product: fileURLToPath(new URL("./product.html", import.meta.url)),
        cart: fileURLToPath(new URL("./cart.html", import.meta.url)),
      },
    },
  },
});
