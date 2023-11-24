// import Link from "next/link";
// import Image from "next/image";
// import getAllHospitals from "../lib/getAllHospitals";

// const HospitalSection = async () => {
//   const data = await getAllHospitals();
//   const hospital = data.data.hospital;

//   return (
//     <>
//       <section id="hospital-section">
//         <div className="marquee-wrapper">
//           <div className="marquee" style={{ animationDuration: "11s" }}>
//             {hospital &&
//               hospital.map((e) => (
//                 <div className="Marquee-tag" key={e.id}>
//                   {e.slug && e.country ? (
//                     <Link href={`/hospital/${e.slug}/${e.country}`}>
//                       {/* Add "as" prop to specify the actual URL */}
//                       <span>
//                         <img
//                           className="dr-img"
//                           src={`https://dev.medflick.com/hospital/${e.icon}`}
//                           alt={e.slug}
//                         />
//                       </span>
//                     </Link>
//                   ) : (
//                     <span>Missing slug or country</span>
//                   )}
//                 </div>
//               ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default HospitalSection;
