// "use client";
// import Link from "next/link";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import Image from "next/image";
// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 1,
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 1,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 1,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//   },
// };

// const About = () => {
//   return (
//     <>
//       <section id="home-about">
//         <div className="midbox-inner  wiki-mk">
//           <div className="homeabout-box">
//             <div className="homeabout-left">
//             <h2>
//                 Your Health, <span>Our Purpose</span>
//               </h2>
//               <p>
//                 From diagnosis to recovery, our commitment is to provide you
//                 with the highest level of care. Welcome to Medflick, where your
//                 health comes first. Our approach is built on four pillars -
//                 Commitment, Trust, Excellence, and Quality Standards, that drive
//                 us to exceed boundaries for your well-being.
//               </p>
//               <Link href="/question-answer">
//                 Ask FREE Question
//                 <img
//                   src="/images/2023/01/arrow-c.png"
                 
//                   alt="arrow"
//                 />
//               </Link>
//             </div>
//             <div className="homeabout-right">
//               <Carousel
//                 responsive={responsive}
//                 arrows={false}
//                 autoPlay={true}
//                 autoPlaySpeed={1500}
//                 infinite={true}
//                 showDots={true}
//               >
//                 <div className="about-showbox">
//                   <img src="/images/2023/01/09/1.jpg" />
//                   <div className="about-med">
//                     <h3>Clinical Excellence</h3>
//                     <p>
//                       Our commitment to excellence drives us to connect you with
//                       the best doctors and top hospitals to provide you with the
//                       finest care possible.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="about-showbox">
//                   <img src="/images/2023/01/09/2.jpg" />
//                   <div className="about-med">
//                     <h3>Patient First</h3>
//                     <p>
//                       Health journeys can take unexpected turns, leaving you
//                       uncertain, which is why we are here to guide you every
//                       step of the way, whether it is planned or sudden, surgical
//                       or medical.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="about-showbox">
//                   <img src="/images/2023/01/09/2.jpg" />
//                   <div className="about-med">
//                     <h3>Trust</h3>
//                     <p>
//                       When it comes to your health decisions, you can count on
//                       us. Your well-being is our priority, and we constantly
//                       strive to win your trust.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="about-showbox">
//                   <img src="/images/2023/01/09/2.jpg" />
//                   <div className="about-med">
//                     <h3>Quality Standards</h3>
//                     <p>
//                       Experience the best care with the power of world-class
//                       technology and global standards. We ensure your medical
//                       journey is supported by the latest advancements and is at
//                       par with International standards.
//                     </p>
//                   </div>
//                 </div>
//               </Carousel>
//             </div>
//           </div>
//         </div> 
//       </section>
//     </>
//   );
// };

// export default About;
