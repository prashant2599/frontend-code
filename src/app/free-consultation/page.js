import FreeConsultation from "./FreeConsultation";

const page = () => {
  return (
    <>
      <FreeConsultation />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    alternates: {
      canonical: `https://medflick.com/free-consultation`,
    },
  };
}
