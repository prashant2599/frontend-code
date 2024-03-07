/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "dev.medflick.com",
      "medflick-frontend.s3.ap-south-1.amazonaws.com",
      "https:/images.medflick.com/images",
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
      {
        source: "/hospital/ibs-hospital/india",
        destination: "/hospital/ibs-hospital-delhi",
        permanent: true,
      },
      {
        source: "/hospital/aster-al-raffah/oman",
        destination: "/hospital/aster-al-raffah-muscat",
        permanent: true,
      },
      {
        source: "/hospital/apollo-hospitals-hyderabad/india",
        destination: "/hospital/apollo-hospitals-hyderabad",
        permanent: true,
      },
      {
        source: "/hospital/indraprastha-apollo-hospital/india",
        destination: "/hospital/indraprastha-apollo-hospital",
        permanent: true,
      },
      {
        source: "/hospital/medanta-hospital-gurugram/india",
        destination: "/hospital/medanta-hospital-gurugram",
        permanent: true,
      },
      {
        source: "/hospital/jupiter-hospital/india",
        destination: "/hospital/jupiter-hospital-thane",
        permanent: true,
      },
      {
        source: "/hospital/yashoda-hospital-hyderabad/india",
        destination: "/hospital/yashoda-hospital-hyderabad",
        permanent: true,
      },
      {
        source: "/hospital/fortis-memorial-research-institute/india",
        destination: "/hospital/fortis-memorial-research-institute-gurgaon",
        permanent: true,
      },
      {
        source: "/hospital/apollo-cancer-center-chennai/india",
        destination: "/hospital/apollo-cancer-center-chennai",
        permanent: true,
      },
      {
        source: "/hospital/apollo-proton-chennai/india",
        destination: "/hospital/apollo-proton-chennai",
        permanent: true,
      },
      {
        source: "/hospital/eternal-hospital/india",
        destination: "/hospital/eternal-hospital-jaipur",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
