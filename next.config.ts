import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/ficxus", destination: "https://server.achinta.me/api", permanent: false },
      { source: "/api", destination: "https://server.achinta.me/api", permanent: false },
      { source: "/server", destination: "https://server.achinta.me/api", permanent: false },
      { source: "/search", destination: "https://ai-search.achinta.me", permanent: false },
      { source: "/collab", destination: "https://devcollab.achinta.me", permanent: false },
      { source: "/devcollab", destination: "https://devcollab.achinta.me", permanent: false },
      { source: "/groq", destination: "https://groq-proxy-0t5r.onrender.com", permanent: false },
      { source: "/groq-proxy", destination: "https://groq-proxy-0t5r.onrender.com", permanent: false },
      { source: "/legal", destination: "https://legallens.achinta.me", permanent: false },
      { source: "/legallens", destination: "https://legallens.achinta.me", permanent: false },
      { source: "/polymind", destination: "https://polymind.achinta.me", permanent: false },
      { source: "/mind", destination: "https://polymind.achinta.me", permanent: false },
      { source: "/portfolio", destination: "https://portfolio.achinta.me", permanent: false },
      { source: "/me", destination: "https://portfolio.achinta.me", permanent: false },
      { source: "/shortly", destination: "https://shortly.achinta.me", permanent: false },
      { source: "/short", destination: "https://shortly.achinta.me", permanent: false },
      { source: "/github", destination: "https://github.com/Achinta005", permanent: false },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
