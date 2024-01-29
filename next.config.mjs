/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        port: "",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    domains: ["cdn.simpleicons.org", "simpleicons.org"],
  },
};

export default nextConfig;
