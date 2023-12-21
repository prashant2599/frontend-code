import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import FreeConsultation from "./FreeConsultation";

const page = () => {
  return (
    <>
    <NewHeader />
      <FreeConsultation />
      <NewFooter />
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
