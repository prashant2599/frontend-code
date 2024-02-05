// import Link from "next/link";

// const RelatedDoctor = async ({ category, doctorId }) => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/${category}`,
//     { cache: "no-store" }
//   );
//   const datas = await res.json();
//   const doctors = datas.doctors_list.doctors_list;
//   const filteredDoctors =
//     doctors?.filter((doctor) => doctor.id !== doctorId) ?? [];

//   // Take the first 11 related doctors
//   const Rdoctors = filteredDoctors.slice(0, 10);

//   return (
//     <>
//       <section id="home-doc-hos">
//         <div className="midbox-inner wiki-mk">
//           <h2>
//             Best {category.charAt(0).toUpperCase() + category.slice(1)} Doctors
//           </h2>

//           <div className="home-symptoms-nav">
//             {Rdoctors.map((e) => (
//               <Link href={`/doctor/${e.slug}`} key={e.id}>
//                 {e.prefix} {e.first_name} {e.last_name}
//               </Link>
//             ))}
//           </div>
//         </div>

//         <Link href={`/doctors/${category}`} className="related-doctors">
//           View All <img src="/images/new-images/2023/01/arrow-c.png" alt="" />
//         </Link>
//       </section>
//     </>
//   );
// };

// export default RelatedDoctor;
