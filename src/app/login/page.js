import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import Login from "./Login";

const page = () => {
  return (
    <>
      <NewHeader />
      <Login />
      <NewFooter />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    alternates: {
      canonical: `https://medflick.com/login`,
    },
  };
}
