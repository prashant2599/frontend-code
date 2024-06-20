/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "dev.medflick.com",
      "medflick-frontend.s3.ap-south-1.amazonaws.com",
      "https://images.medflick.com/images",
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
      {
        source: "/speciality/transplants",
        destination: "/speciality/transplants/india",
        permanent: true,
      },
      {
        source: "/treatment/bone-marrow-transplant",
        destination: "/treatment/bone-marrow-transplant/india",
        permanent: true,
      },
      {
        source: "/treatment/kidney-transplant",
        destination: "/treatment/kidney-transplant/india",
        permanent: true,
      },
      {
        source: "/treatment/heart-transplant",
        destination: "/treatment/heart-transplant/india",
        permanent: true,
      },
      {
        source: "/treatment/liver-transplant",
        destination: "/treatment/liver-transplant/india",
        permanent: true,
      },
      {
        source: "/treatment/liver-transplant",
        destination: "/treatment/liver-transplant/india",
        permanent: true,
      },
      {
        source: "/treatment/lung-transplant",
        destination: "/treatment/lung-transplant/india",
        permanent: true,
      },
      {
        source: "/speciality/neurosurgery",
        destination: "/speciality/neurosurgery/india",
        permanent: true,
      },
      {
        source: "/treatment/spinal-cord-injury-treatment",
        destination: "/treatment/spinal-cord-injury-treatment/india",
        permanent: true,
      },
      {
        source: "/treatment/brain-tumour-surgery",
        destination: "/treatment/brain-tumour-surgery/india",
        permanent: true,
      },
      {
        source: "/treatment/dystonia-treatment",
        destination: "/treatment/dystonia-treatment/india",
        permanent: true,
      },
      {
        source: "/treatment/parkinsons-treatment",
        destination: "/treatment/parkinsons-treatment/india",
        permanent: true,
      },
      {
        source: "/treatment/interstim-therapy-bladder-bowel-control",
        destination: "/treatment/interstim-therapy-bladder-bowel-control/india",
        permanent: true,
      },
      {
        source: "/treatment/spine-surgery",
        destination: "/treatment/spine-surgery/india",
        permanent: true,
      },
      {
        source: "/treatment/robotic-spine-surgery",
        destination: "/treatment/robotic-spine-surgery/india",
        permanent: true,
      },
      {
        source: "/speciality/cancer-care",
        destination: "/speciality/cancer-care/india",
        permanent: true,
      },
      {
        source: "/treatment/colon-cancer",
        destination: "/treatment/colon-cancer/india",
        permanent: true,
      },
      {
        source: "/treatment/prostate-cancer",
        destination: "/treatment/prostate-cancer/india",
        permanent: true,
      },
      {
        source: "/treatment/proton-beam-therapy",
        destination: "/treatment/proton-beam-therapy/india",
        permanent: true,
      },
      {
        source: "/treatment/cervical-cancer",
        destination: "/treatment/cervical-cancer/india",
        permanent: true,
      },
      {
        source: "/treatment/lung-cancer",
        destination: "/treatment/lung-cancer/india",
        permanent: true,
      },
      {
        source: "/treatment/mouth-cancer",
        destination: "/treatment/mouth-cancer/india",
        permanent: true,
      },
      {
        source: "/treatment/cancer-surgery",
        destination: "/treatment/cancer-surgery/india",
        permanent: true,
      },
      {
        source: "/treatment/breast-cancer-treatment",
        destination: "/treatment/breast-cancer-treatment/india",
        permanent: true,
      },
      {
        source: "/treatment/leukemia-treatment",
        destination: "/treatment/leukemia-treatment/india",
        permanent: true,
      },
      {
        source: "/treatment/chemotherapy",
        destination: "/treatment/chemotherapy/india",
        permanent: true,
      },
      {
        source: "/treatment/immunity-therapy",
        destination: "/treatment/immunity-therapy/india",
        permanent: true,
      },
      {
        source: "/treatment/radiation-therapy",
        destination: "/treatment/radiation-therapy/india",
        permanent: true,
      },
      {
        source: "/speciality/cardiac-surgery",
        destination: "/speciality/cardiac-surgery/india",
        permanent: true,
      },
      {
        source: "/treatment/coronary-artery-bypass-graft-surgery",
        destination: "/treatment/coronary-artery-bypass-graft-surgery/india",
        permanent: true,
      },
      {
        source: "/treatment/transcatheter-aortic-valve-implantation",
        destination: "/treatment/transcatheter-aortic-valve-implantation/india",
        permanent: true,
      },
      {
        source: "/treatment/angioplasty-and-stent-placement",
        destination: "/treatment/angioplasty-and-stent-placement/india",
        permanent: true,
      },
      {
        source: "/treatment/open-heart-surgery",
        destination: "/treatment/open-heart-surgery/india",
        permanent: true,
      },
      {
        source: "/treatment/angiogram",
        destination: "/treatment/angiogram/india",
        permanent: true,
      },
      {
        source: "/treatment/heart-valve-replacement-surgery",
        destination: "/treatment/heart-valve-replacement-surgery/india",
        permanent: true,
      },
      {
        source: "/speciality/ivf",
        destination: "/speciality/ivf/india",
        permanent: true,
      },
      {
        source: "/treatment/in-vitro-fertilization-ivf",
        destination: "/treatment/in-vitro-fertilization-ivf/india",
        permanent: true,
      },
      {
        source: "/speciality/cosmetic-plastic-surgery",
        destination: "/speciality/cosmetic-plastic-surgery/india",
        permanent: true,
      },
      {
        source: "/treatment/botox-treatment",
        destination: "/treatment/botox-treatment/india",
        permanent: true,
      },
      {
        source: "/treatment/rhinoplasty",
        destination: "/treatment/rhinoplasty/india",
        permanent: true,
      },
      {
        source: "/treatment/vaginoplasty",
        destination: "/treatment/vaginoplasty/india",
        permanent: true,
      },
      {
        source: "/treatment/under-eye-filler-treatment",
        destination: "/treatment/under-eye-filler-treatment/india",
        permanent: true,
      },
      {
        source: "/treatment/mole-removal-surgery",
        destination: "/treatment/mole-removal-surgery/india",
        permanent: true,
      },
      {
        source: "/treatment/tattoo-removal-procedure",
        destination: "/treatment/tattoo-removal-procedure/india",
        permanent: true,
      },
      {
        source: "/treatment/gynecomastia-treatment-surgery",
        destination: "/treatment/gynecomastia-treatment-surgery/india",
        permanent: true,
      },
      {
        source: "/treatment/breast-reduction-surgery",
        destination: "/treatment/breast-reduction-surgery/india",
        permanent: true,
      },
      {
        source: "/treatment/tummy-tuck",
        destination: "/treatment/tummy-tuck/india",
        permanent: true,
      },
      {
        source: "/treatment/liposuction",
        destination: "/treatment/liposuction/india",
        permanent: true,
      },
      {
        source: "/treatment/lip-reduction-surgery",
        destination: "/treatment/lip-reduction-surgery/india",
        permanent: true,
      },
      {
        source: "/treatment/high-intensity-focused-ultrasound",
        destination: "/treatment/high-intensity-focused-ultrasound/india",
        permanent: true,
      },
      {
        source: "/treatment/plastic-surgery",
        destination: "/treatment/plastic-surgery/india",
        permanent: true,
      },
      {
        source: "/treatment/dimple-creation-surgery",
        destination: "/treatment/dimple-creation-surgery/india",
        permanent: true,
      },
      {
        source: "/speciality/orthopedics",
        destination: "/speciality/orthopedics/india",
        permanent: true,
      },
      {
        source: "/treatment/arthroscopic-surgery",
        destination: "/treatment/arthroscopic-surgery/india",
        permanent: true,
      },
      {
        source: "/treatment/hip-replacement-surgery",
        destination: "/treatment/hip-replacement-surgery/india",
        permanent: true,
      },
      {
        source: "/treatment/knee-replacement-surgery",
        destination: "/treatment/knee-replacement-surgery/india",
        permanent: true,
      },
      {
        source: "/treatment/shoulder-replacement-surgery",
        destination: "/treatment/shoulder-replacement-surgery/india",
        permanent: true,
      },
      {
        source: "/speciality/neuro-rehabilitation",
        destination: "/speciality/neuro-rehabilitation/india",
        permanent: true,
      },
      {
        source: "/treatment/neuro-rehabilitation",
        destination: "/treatment/neuro-rehabilitation/india",
        permanent: true,
      },
      {
        source: "/speciality/blood-disorder",
        destination: "/speciality/blood-disorder/india",
        permanent: true,
      },
      {
        source: "/treatment/aplastic-anaemia-treatment",
        destination: "/treatment/aplastic-anaemia-treatment/india",
        permanent: true,
      },
      {
        source: "/treatment/haemophilia-treatment",
        destination: "/treatment/haemophilia-treatment/india",
        permanent: true,
      },
      {
        source: "/treatment/leukaemia-treatment",
        destination: "/treatment/leukaemia-treatment/india",
        permanent: true,
      },
      {
        source: "/speciality/blood-disorder",
        destination: "/speciality/blood-disorder/india",
        permanent: true,
      },
      {
        source: "/treatment/aplastic-anaemia-treatment",
        destination: "/treatment/aplastic-anaemia-treatment/india",
        permanent: true,
      },
      {
        source: "/treatment/haemophilia-treatment",
        destination: "/treatment/haemophilia-treatment/india",
        permanent: true,
      },
      {
        source: "/treatment/leukaemia-treatment",
        destination: "/treatment/leukaemia-treatment/india",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
