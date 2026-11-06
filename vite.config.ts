import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backend = env.WEBYUGI_API_TARGET || "https://localhost:7146";
  const proxy = {
    "/api": {
      target: backend,
      changeOrigin: true,
      secure: false,
      rewrite: (path: string) => path.replace(/^\/api/, ""),
    },
    "/uploads": {
      target: backend,
      changeOrigin: true,
      secure: false,
    },
  };

  return {
    plugins: [react()],
    server: { host: "localhost", port: 5173, strictPort: true, proxy },
    preview: { host: "localhost", port: 4173, strictPort: true, proxy },
  };
});
