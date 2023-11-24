
import SignUp from "./SignUp";

const page = () => {
  return (
    <>
      <SignUp />
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

