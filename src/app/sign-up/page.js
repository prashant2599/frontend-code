
import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import SignUp from "./SignUp";

const page = () => {
  return (
    <>
    <NewHeader />
      <SignUp />
      <NewFooter />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    alternates: {
      canonical: `https://medflick.com/sign-up`,
    },
  };
}

