import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import Terms from "./Terms";

const page = () => {
  return (
    <>
      <NewHeader />
      <Terms />
      <NewFooter />
    </>
  );
};

export default page;

export async function generateMetadata() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const currentMonthName = monthNames[currentMonthIndex]; // Add 1 because getMonth() returns 0-based index (0 for January)
  const currentYear = currentDate.getFullYear();

  return {
    title:
      "Medflick's Privacy Statement - Last Updated on " +
      currentMonthName +
      " " +
      currentYear,
    description:
      "The Privacy Policy of Medflick. Here we explain, how we connect, use, disclose and safeguard your personal information when you use our website and services.",
    openGraph: {
      title:
        "Medflick's Privacy Statement - Last Updated on " +
        currentMonthName +
        " " +
        currentYear,
      description:
        "The Privacy Policy of Medflick. Here we explain, how we connect, use, disclose and safeguard your personal information when you use our website and services.",
    },
    alternates: {
      canonical: `https://medflick.com/terms`,
    },
  };
}
