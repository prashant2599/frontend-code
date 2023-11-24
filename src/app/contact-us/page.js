import ContactUs from "./ContactUs";

const page = () => {
  return (
    <>
      <ContactUs />
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
