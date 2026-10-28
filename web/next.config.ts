import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

// Absolute path of web/ itself, resolved from this file rather than the shell's
// working directory, so Turbopack never treats the repository root as the project.
const webRoot = fileURLToPath(new URL(".", import.meta.url));

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: webRoot,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // The isolated v3 foundation must not be indexed, including non-HTML responses.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
