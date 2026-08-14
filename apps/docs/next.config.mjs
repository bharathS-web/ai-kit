/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // Allows importing the workspace package's source/dist directly
  transpilePackages: ["@ai-kit/react"],

  // Required for GitHub Pages: outputs static HTML/CSS/JS to `out/`
  output: "export",

  // Repo is deployed at bharathS-web.github.io/ai-kit, so every route/asset
  // needs this prefix. Only applied in production builds (local `next dev`
  // stays at "/" so development isn't affected).
  basePath: isProd ? "/ai-kit" : "",
  assetPrefix: isProd ? "/ai-kit/" : "",

  // GitHub Pages serves files literally — static export needs trailing
  // slashes so `/components/thinking` resolves to
  // `/components/thinking/index.html` instead of a missing file.
  trailingSlash: true,

  // next/image's optimization API needs a server, which GitHub Pages
  // doesn't have. Disable it so images are served as-is.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
