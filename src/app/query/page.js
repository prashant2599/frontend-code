
import QueryForm from "./QueryForm";


const page = () => {
  return (
    <>
    
        <QueryForm />
    
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



