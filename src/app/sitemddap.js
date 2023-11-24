// import getALLBlogs from "./lib/getALLBlogs";
// import getAllSpeciality from "./lib/getAllSpeciality";
// import getAllHospitals from "./lib/getAllHospitals";
// import getAllDoctors from "./lib/getALLDoctors";

// export default async function sitemap() {
//   const baseUrl = "https://medflick.com";

//   // Get All speciality country wise
//   const data = await getAllSpeciality();
//   const specialitys = data.data.Speciality;
//   const specialityUrl =
//     specialitys.map((e) => {
//       return {
//         url: `${baseUrl}/speciality/${e.slug}/${e.country}`,
//         lastModified: new Date(),
//       };
//     }) ?? [];

//   // get all speciality
//   const AllspecialityUrl =
//     specialitys.map((e) => {
//       return {
//         url: `${baseUrl}/speciality/${e.slug}`,
//         lastModified: new Date(),
//       };
//     }) ?? [];

//   // Get all treatmnets
//   const treatment = data.data.treatmentsforSitemap;
//   const treatmentUrl =
//     treatment.map((e) => {
//       return {
//         url: `${baseUrl}/treatment/${e.slug}/${e.country}`,
//         lastModified: new Date(),
//       };
//     }) ?? [];

//   // get all hospital details
//   const hospitaldata = await getAllHospitals();
//   const hospitalDet = hospitaldata.data.hospital;
//   const hospitalDetailsUrl =
//     hospitalDet?.map((e) => {
//       return {
//         url: `${baseUrl}/hospital/${e.slug}/${e.country}`,
//         lastModified: new Date(),
//       };
//     }) ?? [];

//   // get all doctor details
//   const Doctordata = await getAllDoctors();
//   const doctorDet = Doctordata.data.doctors;
//   const doctorDetailsUrl =
//     doctorDet.map((e) => {
//       return {
//         url: `${baseUrl}/doctor/${e.slug}`,
//         lastModified: new Date(),
//       };
//     }) ?? [];

//   // Get all speciality doctors

//   // const doctorsSpecialityUrl =
//   // doctorDet.map((e) => {
//   //   return {
//   //     url: `${baseUrl}/doctors/${e.specialities_slug}/${e.country}`,
//   //     lastModified: new Date(),
//   //   };
//   // }) ?? [];
//   const doctorsSpecialityUrlSet = new Set();

//   const doctorsSpecialityUrl = doctorDet
//     .map((e) => {
//       const url = `${baseUrl}/doctors/${e.specialities_slug}/${e.country}`;
//       if (!doctorsSpecialityUrlSet.has(url)) {
//         doctorsSpecialityUrlSet.add(url);
//         return {
//           url: url,
//           lastModified: new Date(),
//         };
//       }
//       return null;
//     })
//     .filter(Boolean);

//   //  get all doctors by city

//   // const doctorCityWise =
//   //   doctorDet.map((e) => {
//   //     return {
//   //       url: `${baseUrl}/doctors/${e.specialities_slug}/${e.location}/${e.country}`,
//   //       lastModified: new Date(),
//   //     };
//   //   }) ?? [];

//   const doctorCityWiseUrlSet = new Set();

//   const doctorCityWise = doctorDet
//     .map((e) => {
//       const url = `${baseUrl}/doctors/${e.specialities_slug}/${e.location}/${e.country}`;
//       if (!doctorCityWiseUrlSet.has(url)) {
//         doctorCityWiseUrlSet.add(url);
//         return {
//           url: url,
//           lastModified: new Date(),
//         };
//       }
//       return null;
//     })
//     .filter(Boolean);

//   //  get all doctors by country
//   // const doctorCountryWise =
//   //   doctorDet.map((e) => {
//   //     return {
//   //       url: `${baseUrl}/doctors/${e.specialities_slug}/${e.treatments_slug}/country/${e.country}`,
//   //       lastModified: new Date(),
//   //     };
//   //   }) ?? [];

//   const doctorCountryWiseUrlSet = new Set();

//   const doctorCountryWise = doctorDet
//     .map((e) => {
//       const url = `${baseUrl}/doctors/${e.specialities_slug}/${e.treatments_slug}/country/${e.country}`;
//       if (!doctorCountryWiseUrlSet.has(url)) {
//         doctorCountryWiseUrlSet.add(url);
//         return {
//           url: url,
//           lastModified: new Date(),
//         };
//       }
//       return null;
//     })
//     .filter(Boolean);

//   //  get all hospitals by city

//   // const hospitalCityWise =
//   //   hospitalDet.map((e) => {
//   //     return {
//   //       url: `${baseUrl}/hospitals/${e.specialities_slug}/${e.city}/${e.country}`,
//   //       lastModified: new Date(),
//   //     };
//   //   }) ?? [];

//   const hospitalCityWiseUrlSet = new Set();

//   const hospitalCityWise = hospitalDet
//     .map((e) => {
//       const url = `${baseUrl}/hospitals/${e.specialities_slug}/${e.city}/${e.country}`;
//       if (!hospitalCityWiseUrlSet.has(url)) {
//         hospitalCityWiseUrlSet.add(url);
//         return {
//           url: url,
//           lastModified: new Date(),
//         };
//       }
//       return null; // Return null for duplicate URLs
//     })
//     .filter(Boolean); // Filter out null values (i.e., duplicates)

//   // Now, hospitalCityWise contains only unique URLs

//   // Get all speciality hospitals

//   // const hospitalsSpecialityUrl =
//   //   allHospitals.map((e) => {
//   //     return {
//   //       url: `${baseUrl}/hospitals/${e.slug}/${e.country}`,
//   //       lastModified: new Date(),
//   //     };
//   //   }) ?? [];

//   const hospitalsSpecialityUrlSet = new Set();

//   const hospitalsSpecialityUrl = hospitalDet
//     .map((e) => {
//       const url = `${baseUrl}/hospitals/${e.slug}/${e.country}`;
//       if (!hospitalsSpecialityUrlSet.has(url)) {
//         hospitalsSpecialityUrlSet.add(url);
//         return {
//           url: url,
//           lastModified: new Date(),
//         };
//       }
//       return null;
//     })
//     .filter(Boolean);

//   //  get all hospitals by country
//   // const hospitalCountryWise =
//   //   allHospitals.map((e) => {
//   //     return {
//   //       url: `${baseUrl}/hospitals/${e.specialities_slug}/${e.treatments_slug}/country/${e.country}`,
//   //       lastModified: new Date(),
//   //     };
//   //   }) ?? [];

//   const hospitalCountryWiseUrlSet = new Set();

//   const hospitalCountryWise = hospitalDet
//     .map((e) => {
//       const url = `${baseUrl}/hospitals/${e.specialities_slug}/${e.treatments_slug}/country/${e.country}`;
//       if (!hospitalCountryWiseUrlSet.has(url)) {
//         hospitalCountryWiseUrlSet.add(url);
//         return {
//           url: url,
//           lastModified: new Date(),
//         };
//       }
//       return null;
//     })
//     .filter(Boolean);

//   // get all blogs by speciality

//   // const uniqueLocations = [...new Set(blogDet.map((e) => e.speciality_id))];

//   // const blogsSpeciality =
//   //   uniqueLocations.flatMap((blog) => {
//   //     const matchingSpecialities = specialitys.filter(
//   //       (speciality) => String(speciality.id) === String(blog)
//   //     );

//   //     return matchingSpecialities.map((e) => ({
//   //       url: `${baseUrl}/blogs/${e.slug}`,
//   //       lastModified: new Date(),
//   //     }));
//   //   }) ?? [];

//   //  hospital speciality wise all over world

//   const hospitalsSpecialityUrlSetWorld = new Set();

//   const hospitalsSpecialityUrlWorld = hospitalDet
//     .map((e) => {
//       const url = `${baseUrl}/hospitals/${e.specialities_slug}`;
//       if (!hospitalsSpecialityUrlSetWorld.has(url)) {
//         hospitalsSpecialityUrlSetWorld.add(url);
//         return {
//           url: url,
//           lastModified: new Date(),
//         };
//       }
//       return null;
//     })
//     .filter(Boolean);

//   //  Doctors speciality wise all over world

//   const doctorsSpecialityUrlSetWorld = new Set();

//   const doctorsSpecialityUrlWorld = doctorDet
//     .map((e) => {
//       const url = `${baseUrl}/doctors/${e.specialities_slug}`;
//       if (!doctorsSpecialityUrlSetWorld.has(url)) {
//         doctorsSpecialityUrlSetWorld.add(url);
//         return {
//           url: url,
//           lastModified: new Date(),
//         };
//       }
//       return null;
//     })
//     .filter(Boolean);

//   return [
//     {
//       url: baseUrl,
//       lastModified: new Date(),
//     },
//     {
//       url: `${baseUrl}/doctors`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${baseUrl}/hospitals`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${baseUrl}/specialities`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${baseUrl}/terms`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${baseUrl}/contact-us`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${baseUrl}/question-answer`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${baseUrl}/about-us`,
//       lastModified: new Date(),
//     },
//     ...specialityUrl,
//     ...treatmentUrl,
//     ...doctorsSpecialityUrl,
//     ...hospitalsSpecialityUrl,
//     ...hospitalDetailsUrl,
//     ...doctorDetailsUrl,
//     ...doctorCityWise,
//     ...doctorCountryWise,
//     ...hospitalCityWise,
//     ...hospitalCountryWise,
//     // ...blogsSpeciality,
//     ...AllspecialityUrl,
//     ...hospitalsSpecialityUrlWorld,
//     ...doctorsSpecialityUrlWorld,
//   ];
// }
