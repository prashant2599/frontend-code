
import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import CategoryWiseDoctor from "./CategoryWiseDoctor";

const page = () => {
  return (
    <>
    <NewHeader />
      <CategoryWiseDoctor />
      <NewFooter />
    </>
  );
};

export default page;
