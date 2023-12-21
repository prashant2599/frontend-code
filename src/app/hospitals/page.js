import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import AllHospitals from "./AllHospitals";

const page = () => {
  return (
    <>
      <NewHeader />
      <AllHospitals />
      <NewFooter />
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
