// import Image from "next/image";
// import Link from "next/link";
// import HomeForm from "./homeForm/HomeForm";
// import getAllSpeciality from "../lib/getAllSpeciality";
// const HealthQuerys = async () => {
//   const data = await getAllSpeciality();
//   const qa = data.data.qa;
//   const limitedData = qa?.slice(0, 4) ?? [];
//   return (
//     <>
//       <section id="health-queries">
//         <div className="midbox-inner  wiki-mk">
//           <div className="queries-head">
//             <div className="querieshead-left">
//               <h2>Get answers to your health queries.</h2>
//               <p>
//                 Timely Information for Informed Choices. Ask health questions,
//                 receive expert answers. Empowering you with the insights to make
//                 informed health decisions.
//               </p>
//             </div>
//             <div className="querieshead-right">
//               <Link href="/question-answer" className="queries-ask">
//                 Ask FREE Question{" "}
//                 <img src="/images/2023/01/arrow-w.png" alt="arrow-icon" />
//               </Link>
//             </div>
//           </div>

//           <div className="healthcare-professionals">
//             {limitedData &&
//               limitedData.map((e) => (
//                 <div className="professionals" key={e.id}>
//                   <div className="professionals-box">
//                     <img src="/images/2023/01/icon-m.png" alt="" />
//                     <div className="question-box">Q. {e.short_description}</div>
//                     {/* <div className="question-ans">
//                     Q. {e.long_desc}
//                     </div> */}
//                     <div
//                       className="question-ans"
//                       dangerouslySetInnerHTML={{ __html: e.long_description }}
//                     />
//                   </div>
//                 </div>
//               ))}
//           </div>

//           <div className="question-opinion">
//             <h2>Have any health queries? </h2>
//             <p>
//               Engage with our experts. Ask a query and get valuable insights to
//               guide your health decisions. Your questions will be answered with
//               care and expertise.
//             </p>
//           </div>

//           <HomeForm />
//         </div>
//       </section>
//     </>
//   );
// };

// export default HealthQuerys;
