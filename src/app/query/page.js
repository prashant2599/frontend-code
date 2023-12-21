import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import QueryForm from "./QueryForm";

const page = () => {
  return (
    <>
      <NewHeader />
      <QueryForm />
      <NewFooter />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    alternates: {
      canonical: `https://medflick.com/query`,
    },
  };
}
