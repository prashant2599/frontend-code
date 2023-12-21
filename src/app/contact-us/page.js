import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import ContactUs from "./ContactUs";

const page = () => {
  return (
    <>
      <NewHeader />
      <ContactUs />
      <NewFooter />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    openGraph: {
      images: "https://medflick.com/images/2023/02/logo.png",
    },
    alternates: {
      canonical: `https://medflick.com/contact-us`,
    },
  };
}
