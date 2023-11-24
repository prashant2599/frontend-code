// "use client";

// import React, { useState, useEffect } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import Link from "next/link";
// import Image from "next/image";
// import axios from "axios";
// import getAllSpeciality from "../lib/getAllSpeciality";
// import { useRouter } from "next/navigation";
// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 3.3,
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3.3,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 3,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//   },
// };

// const HealthPackage = () => {
//   const router = useRouter();
//   const [speciality, setSpeciality] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const result = await getAllSpeciality();
//         setSpeciality(result.data.Speciality);
//       } catch (err) {
//         console.log(err.message);
//       }
//     }

//     fetchData();
//   }, []);

//   // for active first slug
//   const initialActivePackage =
//     speciality && speciality.length > 0 ? speciality[0].slug : null;
//   const [activePackage, setActivePackage] = useState("transplants");

//   console.log(initialActivePackage);

//   const handlePackageClick = (packageId) => {
//     setActivePackage(packageId);
//   };
//   const [details, setDetails] = useState([]);

//   useEffect(() => {
//     if (activePackage) {
//       // Fetch the details data based on the activePackage ID
//       axios
//         .get(`https://dev.medflick.com/api/speciality/${activePackage}`)
//         .then((response) => {
//           setDetails(response.data.data.treatment_list);
//         })
//         .catch((error) => {
//           console.error("Error fetching details data:", error);
//         });
//     }
//   }, [activePackage]);
//   return (
//     <>
//       <section id="health-packages">
//         <div className="midbox-inner  wiki-mk">
//           <h2>Cost Comparison</h2>

//           <div className="health-tab">
//             {speciality &&
//               speciality.map((e) => (
//                 <button
//                   className={`packageslinks ${
//                     activePackage === e.slug ? "active" : ""
//                   }`}
//                   onClick={() => handlePackageClick(e.slug)}
//                   id={e.id}
//                   key={e.id}
//                 >
//                   {e.name}
//                 </button>
//               ))}
//           </div>
//           {speciality &&
//             speciality.map((e) => (
//               <div
//                 key={e.id}
//                 id={e.id}
//                 className={`packagesbox ${
//                   activePackage === e.slug ? "active" : ""
//                 }`}
//                 style={{
//                   display: activePackage === e.slug ? "block" : "none",
//                 }}
//               >
//                 <div className="owl-slider">
//                   <div id="packages-1" className="owl-carousel">
//                     <Carousel
//                       responsive={responsive}
//                       arrows={false}
//                       infinite={true}
//                       autoPlay={true}
//                       autoPlaySpeed={2000}
//                     >
//                       {details.map((items) => (
//                         <div
//                           className="item"
//                           style={{ marginRight: "20px" }}
//                           key={items.id}
//                         >
//                           <div className="packages-item">
//                             <Image
//                               src={`https://dev.medflick.com/treatments/${items.home_image}`}
//                               alt="tratment-pic"
//                               width="398"
//                               height="487"
//                               className="home-page-cost-img"
//                             />
//                             <Link href={`/treatment/${items.slug}`}>
//                               <div className="packages-text">
//                                 <div className="pack-cost">
//                                   <div className="pack-name">{items.name}</div>
//                                   <div className="cost">$ {items.price}</div>
//                                 </div>
//                                 <div className="packages-details">
//                                   {items.short_description.slice(0, 110)}....
//                                 </div>

//                                 <img
//                                   src="/images/2023/01/pack-arrow.png"
//                                   className="arrow-link"
//                                   alt="rrow"
//                                 />
//                               </div>
//                             </Link>
//                           </div>
//                         </div>
//                       ))}
//                       {/* <button
//               className={`packageslinks ${
//                 activePackage === "packages2" ? "active" : ""
//               }`}
//               onClick={() => handlePackageClick("packages2")}
//             >
//               {" "}
//               Heart Surgery
//             </button>
//             <button
//               className={`packageslinks ${
//                 activePackage === "packages3" ? "active" : ""
//               }`}
//               onClick={() => handlePackageClick("packages3")}
//             >
//               {" "}
//               IVF Treatment{" "}
//             </button>
//             <button
//               className={`packageslinks ${
//                 activePackage === "packages4" ? "active" : ""
//               }`}
//               onClick={() => handlePackageClick("packages4")}
//             >
//               {" "}
//               Neuromodulation{" "}
//             </button> */}

//                       {/* <div className="item" style={{ marginRight: "20px" }}>
//                     <div className="packages-item">
//                       <img src="images/2023/01/07/01/2.jpg" />
//                       <div className="packages-text">
//                         <div className="pack-cost">
//                           <div className="pack-name">Cancer Surgery </div>
//                           <div className="cost">$4000</div>
//                         </div>
//                         <div className="packages-details">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore
//                         </div>
//                         <Link href="/">
//                           <img
//                             src="images/2023/01/pack-arrow.png"
//                             className="arrow-link"
//                             alt=""
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="item" style={{ marginRight: "20px" }}>
//                     <div className="packages-item">
//                       <img src="images/2023/01/07/01/3.jpg" />
//                       <div className="packages-text">
//                         <div className="pack-cost">
//                           <div className="pack-name">Radiation Therapy </div>
//                           <div className="cost">$4000</div>
//                         </div>
//                         <div className="packages-details">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore
//                         </div>
//                         <Link href="/">
//                           <img
//                             src="images/2023/01/pack-arrow.png"
//                             className="arrow-link"
//                             alt=""
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="item" style={{ marginRight: "20px" }}>
//                     <div className="packages-item">
//                       <img src="images/2023/01/07/01/2.jpg" />
//                       <div className="packages-text">
//                         <div className="pack-cost">
//                           <div className="pack-name">Breast Cancer </div>
//                           <div className="cost">$4000</div>
//                         </div>
//                         <div className="packages-details">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore
//                         </div>
//                         <Link href="/">
//                           <img
//                             src="images/2023/01/pack-arrow.png"
//                             className="arrow-link"
//                             alt=""
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   </div> */}
//                     </Carousel>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           {/* 
//           <div
//             id="packages2"
//             className={`packagesbox ${
//               activePackage === "packages2" ? "active" : ""
//             }`}
//             style={{
//               display: activePackage === "packages2" ? "block" : "none",
//             }}
//           >
//             <div className="owl-slider">
//               <div id="packages-2">
//                 <Carousel
//                   responsive={responsive}
//                   arrows={false}
//                   infinite={true}
//                   autoPlay={true}
//                   autoPlaySpeed={2000}
//                 >
//                   <div  className={`packagesbox ${
//               activePackage === "packages2" ? "active" : ""
//             }`} style={{ marginRight: "20px" }}>
//                     <div className="packages-item">
//                       <img src="images/2023/01/07/02/1.jpg" />
//                       <div className="packages-text">
//                         <div className="pack-cost">
//                           <div className="pack-name"> Heart Surgery </div>
//                           <div className="cost">$4000</div>
//                         </div>
//                         <div className="packages-details">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore
//                         </div>
//                         <Link href="/">
//                           <img
//                             src="images/2023/01/pack-arrow.png"
//                             className="arrow-link"
//                             alt=""
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="item" style={{ marginRight: "20px" }}>
//                     <div className="packages-item">
//                       <img src="images/2023/01/07/02/2.jpg" />
//                       <div className="packages-text">
//                         <div className="pack-cost">
//                           <div className="pack-name"> Heart Surgery </div>
//                           <div className="cost">$4000</div>
//                         </div>
//                         <div className="packages-details">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore
//                         </div>
//                         <Link href="/">
//                           <img
//                             src="images/2023/01/pack-arrow.png"
//                             className="arrow-link"
//                             alt=""
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="item" style={{ marginRight: "20px" }}>
//                     <div className="packages-item">
//                       <img src="images/2023/01/07/02/3.jpg" />
//                       <div className="packages-text">
//                         <div className="pack-cost">
//                           <div className="pack-name"> Heart Surgery</div>
//                           <div className="cost">$4000</div>
//                         </div>
//                         <div className="packages-details">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore
//                         </div>
//                         <Link href="/">
//                           <img
//                             src="images/2023/01/pack-arrow.png"
//                             className="arrow-link"
//                             alt=""
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="item" style={{ marginRight: "20px" }}>
//                     <div className="packages-item">
//                       <img src="images/2023/01/07/02/2.jpg" />
//                       <div className="packages-text">
//                         <div className="pack-cost">
//                           <div className="pack-name"> Heart Surgery </div>
//                           <div className="cost">$4000</div>
//                         </div>
//                         <div className="packages-details">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore
//                         </div>
//                         <Link href="/">
//                           <img
//                             src="images/2023/01/pack-arrow.png"
//                             className="arrow-link"
//                             alt=""
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </Carousel>
//               </div>
//             </div>
//           </div>

//           <div
//             id="packages3"
//             className={`packagesbox ${
//               activePackage === "packages3" ? "active" : ""
//             }`}
//             style={{
//               display: activePackage === "packages3" ? "block" : "none",
//             }}
//           >
//             <div className="owl-slider">
//               <div id="packages-3">
//                 <Carousel
//                   responsive={responsive}
//                   arrows={false}
//                   infinite={true}
//                   autoPlay={true}
//                   autoPlaySpeed={2000}
//                 >
//                   <div className="item" style={{ marginRight: "20px" }}>
//                     <div className="packages-item">
//                       <img src="images/2023/01/07/03/1.jpg" />
//                       <div className="packages-text">
//                         <div className="pack-cost">
//                           <div className="pack-name">IVF Treatment </div>
//                           <div className="cost">$4000</div>
//                         </div>
//                         <div className="packages-details">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore
//                         </div>
//                         <Link href="/">
//                           <img
//                             src="images/2023/01/pack-arrow.png"
//                             className="arrow-link"
//                             alt=""
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="item" style={{ marginRight: "20px" }}>
//                     <div className="packages-item">
//                       <img src="images/2023/01/07/03/2.jpg" />
//                       <div className="packages-text">
//                         <div className="pack-cost">
//                           <div className="pack-name"> IVF Treatment </div>
//                           <div className="cost">$4000</div>
//                         </div>
//                         <div className="packages-details">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore
//                         </div>
//                         <Link href="/">
//                           <img
//                             src="images/2023/01/pack-arrow.png"
//                             className="arrow-link"
//                             alt=""
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="item" style={{ marginRight: "20px" }}>
//                     <div className="packages-item">
//                       <img src="images/2023/01/07/03/3.jpg" />
//                       <div className="packages-text">
//                         <div className="pack-cost">
//                           <div className="pack-name"> IVF Treatment </div>
//                           <div className="cost">$4000</div>
//                         </div>
//                         <div className="packages-details">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore
//                         </div>
//                         <Link href="/">
//                           <img
//                             src="images/2023/01/pack-arrow.png"
//                             className="arrow-link"
//                             alt=""
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="item" style={{ marginRight: "20px" }}>
//                     <div className="packages-item">
//                       <img src="images/2023/01/07/02/2.jpg" />
//                       <div className="packages-text">
//                         <div className="pack-cost">
//                           <div className="pack-name"> IVF Treatment </div>
//                           <div className="cost">$4000</div>
//                         </div>
//                         <div className="packages-details">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore
//                         </div>
//                         <Link href="/">
//                           <img
//                             src="images/2023/01/pack-arrow.png"
//                             className="arrow-link"
//                             alt=""
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </Carousel>
//               </div>
//             </div>
//           </div>

//           <div
//             id="packages4"
//             className={`packagesbox ${
//               activePackage === "packages4" ? "active" : ""
//             }`}
//             style={{
//               display: activePackage === "packages4" ? "block" : "none",
//             }}
//           >
//             <div className="owl-slider">
//               <div id="packages-4">
//                 <Carousel
//                   responsive={responsive}
//                   arrows={false}
//                   infinite={true}
//                   autoPlay={true}
//                   autoPlaySpeed={2000}
//                 >
//                   <div className="item" style={{ marginRight: "20px" }}>
//                     <div className="packages-item">
//                       <img src="images/2023/01/07/04/1.jpg" />
//                       <div className="packages-text">
//                         <div className="pack-cost">
//                           <div className="pack-name">Neuromodulation </div>
//                           <div className="cost">$4000</div>
//                         </div>
//                         <div className="packages-details">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore
//                         </div>
//                         <Link href="/">
//                           <img
//                             src="images/2023/01/pack-arrow.png"
//                             className="arrow-link"
//                             alt=""
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="item" style={{ marginRight: "20px" }}>
//                     <div className="packages-item">
//                       <img src="images/2023/01/07/04/2.jpg" />
//                       <div className="packages-text">
//                         <div className="pack-cost">
//                           <div className="pack-name">Neuromodulation </div>
//                           <div className="cost">$4000</div>
//                         </div>
//                         <div className="packages-details">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore
//                         </div>
//                         <Link href="/">
//                           <img
//                             src="images/2023/01/pack-arrow.png"
//                             className="arrow-link"
//                             alt=""
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="item" style={{ marginRight: "20px" }}>
//                     <div className="packages-item">
//                       <img src="images/2023/01/07/04/3.jpg" />
//                       <div className="packages-text">
//                         <div className="pack-cost">
//                           <div className="pack-name">Neuromodulation </div>
//                           <div className="cost">$4000</div>
//                         </div>
//                         <div className="packages-details">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore
//                         </div>
//                         <Link href="/">
//                           <img
//                             src="images/2023/01/pack-arrow.png"
//                             className="arrow-link"
//                             alt=""
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="item" style={{ marginRight: "20px" }}>
//                     <div className="packages-item">
//                       <img src="images/2023/01/07/04/2.jpg" />
//                       <div className="packages-text">
//                         <div className="pack-cost">
//                           <div className="pack-name">Neuromodulation </div>
//                           <div className="cost">$4000</div>
//                         </div>
//                         <div className="packages-details">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore
//                         </div>
//                         <Link href="/">
//                           <img
//                             src="images/2023/01/pack-arrow.png"
//                             className="arrow-link"
//                             alt=""
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </Carousel>
//               </div>
//             </div>
//           </div> */}
//         </div>
//       </section>
//     </>
//   );
// };

// export default HealthPackage;
