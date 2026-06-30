import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    noDiscovery: true,
    include: [],
  },
  server: {
    host: "127.0.0.1",
  },
  preview: {
    host: "127.0.0.1",
  },
});
