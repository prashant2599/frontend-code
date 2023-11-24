import AllHospitals from "./AllHospitals";

const page = () => {
  return (
    <>
      <AllHospitals />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    alternates: {
      canonical: `https://medflick.com/hospitals`,
    },
  };
}
