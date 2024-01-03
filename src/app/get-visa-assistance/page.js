import React from "react";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";
import VisaForm from "./VisaForm";
import VisaaForm from "./VisaaForm";

const page = () => {
  return (
    <>
      <NewHeader />
      <VisaaForm />
      {/* <VisaForm /> */}
      <NewFooter />
    </>
  );
};

export default page;
