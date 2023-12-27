import { Inria_Serif } from "next/font/google";
import Sdoctors from "./Sdoctors";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import NewHeader from "@/app/Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "@/app/Home/NewUIHomepage/inc/NewFooter";
import getALLCountry from "@/app/lib/getAllCountry";
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

    const apiData = await apiResponse.json();

    // Check for error conditions in the response data
    if (apiData.error) {
      throw new Error(`API error: ${apiData.error}`);
    }

    const doctor = apiData.doctors_list.doctors_list;
    const hospitalIcon = apiData.doctors_list.hospital_image;
    const treatment = apiData.doctors_list.treatment;
    const info = apiData.doctors_list.specility_name;
    const pageNumber = apiData.doctors_list.page;
    const totalDoctor = apiData.doctors_list.count;

    const country = await getALLCountry();
    const doctorCountry = country.country_name;

    return (
      <>
        <NewHeader />
        <Sdoctors
          doctor={doctor}
          hospitalIcon={hospitalIcon}
          treatment={treatment}
          combinedSlug={combinedSlug}
          info={info}
          status={apiResponse.status}
          pageNumber={pageNumber}
          totalDoctor={totalDoctor}
          doctorCountry={doctorCountry}
        />
        <NewFooter />
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
  const currentMonthName = monthNames[currentMonthIndex];
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

  const country = await getALLCountry();
  const doctorCountry = country.country_name;

  const slugs = combinedSlug;
  const parts = slugs.split("/");
  const specialitySlug = parts[0];
  const countrySlug = parts[1];
  const citySlug = parts[2];
  const treatmentSlug = parts[1];
  const countrySlugTreatment = parts[3];
  const position5 = parts[5];
  //  for treatment formant country wise

  // if (formattedTreatment.includes("Surgery")) {
  //   updatedTreatment = formattedTreatment.replace(/Surgery/g, "Surgeon");
  // } else {
  //   updatedTreatment = formattedTreatment;
  // }

  const formattedSpeciality = formatText(specialitySlug);
  const formattedCountry = formatText(countrySlug);
  const formattedCity = formatText(citySlug);
  const formattedTreatmnetCountry = formatText(countrySlugTreatment);

  const isPositionInDoctorCountry = doctorCountry.some(
    (countryObj) => countryObj.country === countrySlug
  );
  const isPositionCity = doctor.some((e) => e.location === countrySlug);

  const isPositionTreatmentCity = doctor.some((e) => e.location === citySlug);

  let updatedSpeciality;

  if (formattedSpeciality.includes("Neurosurgery")) {
    updatedSpeciality = formattedSpeciality.replace(
      /Neurosurgery/g,
      "Neurosurgeon"
    );
  } else if (formattedSpeciality.includes("Surgery")) {
    updatedSpeciality = formattedSpeciality.replace(/Surgery/g, "Surgeon");
  } else {
    updatedSpeciality = formattedSpeciality;
  }

  if (isPositionInDoctorCountry === true) {
    return {
      title:
        "Best " +
        updatedSpeciality +
        " " +
        "Doctors in " +
        formattedCountry +
        " " +
        "View reviews - " +
        currentYear,

      description:
        "Find Updated list of " +
        updatedSpeciality +
        " " +
        "Doctors in " +
        formattedCountry +
        ". Find Top " +
        updatedSpeciality +
        " " +
        "Surgeons in " +
        formattedCountry +
        " " +
        "and review | Book hassle free appointment",

      alternates: {
        canonical: `https://medflick.com/doctors/${combinedSlug}`,
      },
    };
  } else if (isPositionCity === true) {
    return {
      title:
        "Best " +
        updatedSpeciality +
        " " +
        "Doctors in " +
        formattedCountry +
        ", " +
        formattedCity +
        " " +
        "View reviews - " +
        currentYear,
      description:
        "Find Updated list of " +
        updatedSpeciality +
        " " +
        "Doctors in " +
        formattedCountry +
        ", " +
        formattedCity +
        ". Find Top " +
        updatedSpeciality +
        " " +
        "Surgeons in " +
        formattedCountry +
        ", " +
        formattedCity +
        " " +
        "and review | Book hassle free appointment",
      alternates: {
        canonical: `https://medflick.com/doctors/${combinedSlug}`,
      },
    };
  } else if (isPositionTreatmentCity === true) {
    return {
      title:
        "Best " +
        formattedCountry +
        " " +
        "Doctors in " +
        formattedCity +
        ", " +
        formattedTreatmnetCountry +
        "- View review " +
        currentYear,
      description:
        "Find Updated List of " +
        formattedCountry +
        " " +
        "Specialist doctors in " +
        formattedCity +
        "," +
        formattedTreatmnetCountry +
        ". Find Top " +
        formattedCountry +
        " " +
        "Specialist " +
        formattedCity +
        "," +
        formattedTreatmnetCountry +
        " and reviews | Book hassle-free appointment",
    };
  } else {
    return {
      title:
        "Best " +
        updatedSpeciality +
        " " +
        "Doctors | Experts " +
        updatedSpeciality +
        " " +
        "Surgeons View Review - " +
        currentYear,

      description:
        "Find Updated List Of " +
        updatedSpeciality +
        " " +
        "doctors. Find top " +
        updatedSpeciality +
        " " +
        "surgeons and review | Book hassle free appointment ",
      alternates: {
        canonical: `https://medflick.com/doctors/${combinedSlug}`,
      },
    };
  }
}
