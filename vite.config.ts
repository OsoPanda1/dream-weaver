/**
 * 🛰️ TAMV VITE ENGINE - KERNEL MD-X4™
 * VERSION: SUPREME_BUILD_v22.0
 * AUTOR: Edwin Oswaldo Castillo Trejo
 * OBJETIVO: Sincronización de Isabella AI & DreamSpaces
 */

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  // Carga de variables de entorno (Supabase & MSR Keys)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      // 🛡️ Seguridad de Cabeceras para DreamSpaces
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        // --- 🗺️ MAPEO DE LA CIVILIZACIÓN ---
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@isabella": path.resolve(__dirname, "./supabase/isabella-orchestrator-mdx4.ts"),
        "@sovereign": path.resolve(__dirname, "./src/TAMV-Sovereign-System-Unified.tsx"),
      },
    },
    build: {
      // 💎 Compilación de Grado Imperial
      target: "esnext",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: mode === "production", // Isabella limpia rastros en producción
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          // Fragmentación para Resiliencia Fénix (Carga Progresiva)
          manualChunks: {
            "isabella-core": ["@tanstack/react-query", "lucide-react"],
            "sovereign-ui": ["framer-motion", "clsx", "tailwind-merge"],
          },
          // Asegurar que el audio nacetamv.wav se procese correctamente
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'nacetamv.wav') {
              return 'assets/audio/[name][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
    // 🧬 Optimización de Dependencias Críticas
    optimizeDeps: {
      include: ["react-router-dom", "@supabase/supabase-js"],
    },
  };
});
