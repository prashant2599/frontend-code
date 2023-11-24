import { Inria_Serif } from "next/font/google";
import Sdoctors from "./Sdoctors";
import { Suspense } from "react";
import { useRouter } from "next/navigation";

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

const page = async ({ params }) => {
  const combinedSlug = params.slug.join("/");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/${combinedSlug}`,
    { cache: "no-store" }
  );

  if (res.status !== 200) {
    return (
      <>
        <div>
          <h1>Error</h1>
        </div>
      </>
    );
  }

  console.log("status", res.status);

  const datas = await res.json();
  const doctor = datas.doctors_list.doctors_list;

  const hospitalIcon = datas.doctors_list.hospital_image;
  const treatment = datas.doctors_list.treatment;
  const info = datas.doctors_list.specility_name;



  return (
    <>
      {/* <Suspense fallback={<SkeltonLoading />}> */}
      <Sdoctors
        doctor={doctor}
        hospitalIcon={hospitalIcon}
        treatment={treatment}
        combinedSlug={combinedSlug}
        info={info}
        status={res.status}
      />
      {/* </Suspense> */}
    </>
  );
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

  // if (position1 === "city") {
  //   return {
  //     title:
  //       "Best " +
  //       formattedSpeciality +
  //       " " +
  //       "doctors in " +
  //       formatedLocation +
  //       " - Updated " +
  //       currentMonthName +
  //       " " +
  //       currentYear,
  //     description:
  //       currentMonthName +
  //       " " +
  //       currentYear +
  //       ", Find the best " +
  //       formattedSpeciality +
  //       " doctors in " +
  //       formatedLocation +
  //       ". Book an appointment online! View " +
  //       formattedSpeciality +
  //       " doctors, profile, experience & review.",
  //     alternates: {
  //       canonical: `https://medflick.com/doctors/${combinedSlug}`,
  //     },
  //   };
  // } else {
  //   return {
  //     title:
  //       "Best " +
  //       updatedTreatment +
  //       " doctors in india - Updated " +
  //       currentMonthName +
  //       " " +
  //       currentYear,
  //     description:
  //       currentMonthName +
  //       " " +
  //       currentYear +
  //       ", Find the best " +
  //       updatedTreatment +
  //       " doctors in india. Book an appointment online! View " +
  //       updatedTreatment +
  //       "  doctors, profile, experience & review.",
  //     alternates: {
  //       canonical: `https://medflick.com/doctors/${combinedSlug}`,
  //     },
  //   };
  // }
  // return {
  //   title: info.doc_title,
  //   description: info.doc_description,
  //   openGraph: {
  //     title: info.doc_title,
  //     description: info.doc_description,
  //   },
  //   alternates: {
  //     canonical: `https://medflick.com/doctors/${combinedSlug}`,
  //   },
  // };
}
