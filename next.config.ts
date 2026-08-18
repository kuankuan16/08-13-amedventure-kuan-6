import type { NextConfig } from "next";

const isExport = process.env.EXPORT_BUILD === "1";
// On Vercel, let its build pipeline manage output (standalone conflicts with it).
const output = isExport ? "export" : process.env.VERCEL ? undefined : "standalone";

const nextConfig: NextConfig = {
  output,
  basePath: isExport ? "/amed-preview" : "",
  images: { unoptimized: isExport },
  allowedDevOrigins: ["192.168.0.148"],
  devIndicators: false,
};

export default nextConfig;
