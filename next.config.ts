import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  // En producción (GitHub Pages) el repo vive en /offset
  basePath: isProd ? "/offset" : "",
  // GitHub Pages sirve archivos estáticos, desactivamos la optimización de imágenes
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
