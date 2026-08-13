import type { NextConfig } from "next";

const isExport = process.env.EXPORT_BUILD === "1";

const nextConfig: NextConfig = {
  output: isExport ? "export" : "standalone",
  basePath: isExport ? "/amed-preview" : "",
  images: { unoptimized: isExport },
  allowedDevOrigins: ["192.168.0.148"],
};

export default nextConfig;
