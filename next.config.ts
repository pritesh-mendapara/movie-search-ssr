import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ["m.media-amazon.com", "img.omdbapi.com"],
    },
};

export default nextConfig;
