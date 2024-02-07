import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";
import VisaaForm from "./VisaaForm";

const page = () => {
  return (
    <>
      <NewHeader />
      <VisaaForm />
      <NewFooter />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    alternates: {
      canonical: `https://medflick.com/get-visa-assistance`,
    },
  };
}
