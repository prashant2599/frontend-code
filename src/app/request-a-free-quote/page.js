import FreeQuote from "./FreeQuote";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";

const page = () => {
  return (
    <>
      <NewHeader />
      <FreeQuote />
      <NewFooter />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    alternates: {
      canonical: `https://medflick.com/request-a-free-quote`,
    },
  };
}
