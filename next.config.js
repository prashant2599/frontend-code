/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "dev.medflick.com",
      "medflick-frontend.s3.ap-south-1.amazonaws.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/hospital/gleneagles-global-health-city/india",
        destination:
          "/hospital/gleneagles-global-health-city-perumbakkam-chennai",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
