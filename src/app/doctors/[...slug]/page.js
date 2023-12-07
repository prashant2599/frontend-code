import { Inria_Serif } from "next/font/google";
import Sdoctors from "./Sdoctors";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
function formatText(text) {
  if (typeof text === "string") {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    return "Invalid input";
  }
}

const page = async ({ params, res }) => {
  try {
    const combinedSlug = params.slug.join("/");
    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/${combinedSlug}`,
      { cache: "no-store" }
    );

    console.log(apiResponse.status);

    if (!apiResponse.ok) {
      throw new Error(`Failed to fetch data: ${apiResponse.status}`);
    }

    const apiData = await apiResponse.json();

    // Check for error conditions in the response data
    if (apiData.error) {
      throw new Error(`API error: ${apiData.error}`);
    }

    const doctor = apiData.doctors_list.doctors_list;
    const hospitalIcon = apiData.doctors_list.hospital_image;
    const treatment = apiData.doctors_list.treatment;
    const info = apiData.doctors_list.specility_name;

    return (
      <>
        <Sdoctors
          doctor={doctor}
          hospitalIcon={hospitalIcon}
          treatment={treatment}
          combinedSlug={combinedSlug}
          info={info}
          status={apiResponse.status}
        />
      </>
    );
  } catch (error) {
    console.error(error);

    // Handle 404 error explicitly
    if (
      error.message.includes("Failed to fetch data: 404") ||
      error.message.includes("API error: 404")
    ) {
      notFound();
    } else {
      // Handle other errors
      res.statusCode = 500; // Set a 500 status code for other errors
      return { props: {} }; // Return an empty props object
    }
  }
};

export default page;

export async function generateMetadata({ params }) {
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

  const combinedSlug = params.slug.join("/");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/${combinedSlug}`,
    { cache: "no-store" }
  );
  const datas = await res.json();
  const info = datas.doctors_list.specility_name;
  const treatmentApi = datas.doctors_list.treatment;
  const doctor = datas.doctors_list.doctors_list;

  const slugs = combinedSlug;
  const parts = slugs.split("/");
  const treatment = parts[0];
  const city = parts[2];
  const position1 = parts[1];

  //  for treatment formant country wise
  const formattedTreatment = formatText(position1);

  let updatedTreatment;

  if (formattedTreatment.includes("Surgery")) {
    updatedTreatment = formattedTreatment.replace(/Surgery/g, "Surgeon"); // Use a regular expression with the 'g' flag for global replacement
  } else {
    updatedTreatment = formattedTreatment;
  }

  const formattedSpeciality = formatText(treatment);

  const matchedTreatment = treatmentApi.find(
    (treatment) => treatment.slug === position1
  );
  const formattedcity = formatText(position1);

  const formattedcountry =
    doctor && doctor.length > 0 ? formatText(doctor[0].country) : null;

  const matchingCity = doctor && doctor.length > 0 ? doctor[0].location : null;
  const matchingCountry =
    doctor && doctor.length > 0 ? doctor[0].country : null;
  console.log(matchedTreatment);
  if (info.doc_title && position1 === matchingCity) {
    return {
      title:
        "Best " +
        formattedSpeciality +
        " " +
        "doctors in " +
        formattedcity +
        " - Updated " +
        currentMonthName +
        " " +
        currentYear,
      description:
        currentMonthName +
        " " +
        currentYear +
        ", Find the best " +
        formattedSpeciality +
        " doctors in " +
        formattedcity +
        ". Book an appointment online! View " +
        formattedSpeciality +
        " doctors, profile, experience & review.",
      alternates: {
        canonical: `https://medflick.com/doctors/${combinedSlug}`,
      },
      openGraph: {
        images: "https://medflick.com/images/2023/02/logo.png",
      },
    };
  } else if (
    info.doc_title &&
    matchedTreatment &&
    position1 === matchedTreatment.slug
  ) {
    return {
      title:
        "Best " +
        updatedTreatment +
        " doctors in " +
        formattedcountry +
        " - Updated " +
        currentMonthName +
        " " +
        currentYear,
      description:
        currentMonthName +
        " " +
        currentYear +
        ", Find the best " +
        updatedTreatment +
        " doctors in" +
        formattedcountry +
        ". Book an appointment online! View " +
        updatedTreatment +
        "  doctors, profile, experience & review.",
      alternates: {
        canonical: `https://medflick.com/doctors/${combinedSlug}`,
      },
      openGraph: {
        images: "https://medflick.com/images/2023/02/logo.png",
      },
    };
  } else {
    return {
      title: info.doc_title,
      description: info.doc_description,
      openGraph: {
        title: info.doc_title,
        description: info.doc_description,
        images: "https://medflick.com/images/2023/02/logo.png",
      },
      alternates: {
        canonical: `https://medflick.com/doctors/${combinedSlug}`,
      },
    };
  }
}
