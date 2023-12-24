import React from "react";
import AllDoctors from "./AllDoctors";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";

const page = () => {
  return (
    <>
      <NewHeader />
      <AllDoctors />
      <NewFooter />
    </>
  );
};

export default page;

export async function generateMetadata() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return {
    title:
      "Find The Top Doctors List In India, Updated 2023 | Treatments Specialist " +
      currentYear,
    description:
      "On Medflick, get the top doctors in India, updated in 2023 & make an appointment online instantly! View consultation cost & address of specialist in India.",
    openGraph: {
      title:
        "Find The Top Doctors List In India, Updated 2023 | Treatments Specialist " +
        currentYear,
      description:
        "On Medflick, get the top doctors in India, updated in 2023 & make an appointment online instantly! View consultation cost & address of specialist in India.",
      images: "https://medflick.com/images/2023/02/logo.png",
    },
    alternates: {
      canonical: `https://medflick.com/doctors`,
    },
  };
}
