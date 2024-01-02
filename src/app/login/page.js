import Login from "./Login";

const page = () => {
  return (
    <>
      <Login />
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
