// import getALLSearchApi from "./lib/getAllSearchApi";

// export default async function sitemap() {
//   const baseUrl = "https://medflick.com";

//   const data = await getALLSearchApi();

//   const speciality = data.searchData.speciality;
//   const treatment = data.searchData.treatments;
//   const doctors = data.searchData.doctors;
//   const hospitals = data.searchData.hospitals;

//   //  all speciality without country
//   const AllspecialityUrl =
//     speciality.map((e) => {
//       return {
//         url: `${baseUrl}/speciality/${e.slug}`,
//         lastModified: new Date(),
//       };
//     }) ?? [];

//   //  all treatment without country

//   const treatmentUrl =
//     treatment.map((e) => {
//       return {
//         url: `${baseUrl}/treatment/${e.slug}`,
//         lastModified: new Date(),
//       };
//     }) ?? [];

//   //  all doctors
//   const doctorDetailsUrl =
//     doctors.map((e) => {
//       return {
//         url: `${baseUrl}/doctor/${e.slug}`,
//         lastModified: new Date(),
//       };
//     }) ?? [];

//   //  all hospitals

//   const hospitalDetailsUrl =
//     hospitals?.map((e) => {
//       return {
//         url: `${baseUrl}/hospital/${e.slug}/`,
//         lastModified: new Date(),
//       };
//     }) ?? [];

//   //  speciality wise doctors
//   const doctorsSpecialityUrl =
//     speciality.map((e) => {
//       return {
//         url: `${baseUrl}/doctors/${e.slug}`,
//         lastModified: new Date(),
//       };
//     }) ?? [];

//   // speciality wise hospitals

//   const hospitalsSpecialityUrl =
//     speciality.map((e) => {
//       return {
//         url: `${baseUrl}/hospitals/${e.slug}`,
//         lastModified: new Date(),
//       };
//     }) ?? [];

//   //  all treatment country wise

//   const treatmentCountryWise =
//     treatment.flatMap((e) => {
//       const countries = e.country.split(",");
//       return countries.map((country) => ({
//         url: `${baseUrl}/treatment/${e.slug}/${country.trim()}`,
//         lastModified: new Date(),
//       }));
//     }) ?? [];

//   //  all speciality country wise

//   const specialityCountryWise = speciality.flatMap((e) => {
//     const countries = e.country.split(",");
//     return countries.map((country) => ({
//       url: `${baseUrl}/speciality/${e.slug}/${country.trim()}`,
//       lastModified: new Date(),
//     }));
//   });

//   //  doctors list country wise  speciality

//   const doctorsSpecialityCountryWise = speciality.flatMap((e) => {
//     const countries = e.country.split(",");
//     return countries.map((country) => ({
//       url: `${baseUrl}/doctors/${e.slug}/${country.trim()}`,
//       lastModified: new Date(),
//     }));
//   });

//   //   hospital list country wise speciality

//   const hospitalsSpecialityCountryWise = speciality.flatMap((e) => {
//     const countries = e.country.split(",");
//     return countries.map((country) => ({
//       url: `${baseUrl}/hospitals/${e.slug}/${country.trim()}`,
//       lastModified: new Date(),
//     }));
//   });

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
//       url: `${baseUrl}/blogs`,
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
//       url: `${baseUrl}/terms-and-conditions`,
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
//     {
//       url: `${baseUrl}/partners`,
//       lastModified: new Date(),
//     },
//     ...AllspecialityUrl,
//     ...treatmentUrl,
//     ...doctorDetailsUrl,
//     ...hospitalDetailsUrl,
//     ...doctorsSpecialityUrl,
//     ...hospitalsSpecialityUrl,
//     ...treatmentCountryWise,
//     ...specialityCountryWise,
//     {
//       url: `${baseUrl}/request-a-free-quote`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${baseUrl}/careers`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${baseUrl}/privacy-policy`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${baseUrl}/disclaimer`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${baseUrl}/get-visa-assistance`,
//       lastModified: new Date(),
//     },
//     ...doctorsSpecialityCountryWise,
//     ...hospitalsSpecialityCountryWise,
//   ];
// }
