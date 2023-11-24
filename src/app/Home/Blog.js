// "use client";

// import React, { useState, useEffect } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import axios from "axios";
// import Link from "next/link";
// import Image from "next/image";
// import getAllSpeciality from "../lib/getAllSpeciality";

// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 1.4,
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 1.5,
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

// const Blog = () => {
//   const [blog, setBlog] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // useEffect(() => {
//   //   axios
//   //     .get(`https://dev.medflick.com/api/blogs`)
//   //     .then((response) => {
//   //       setBlog(response.data.data.blogs);
//   //       setLoading(false);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching data:", error);
//   //     });
//   // }, []);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const result = await getAllSpeciality();
//         setBlog(result.data.blogs);
//       } catch (err) {
//         console.log(err.message); // Set the error message in state
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <>
//       <section id="blog-home">
//         <div className="midbox-inner  wiki-mk">
//           <div className="blog-homebox">
//             <div className="homeblog-left">
//               <h2>MedBlog: Your Source for Health Knowledge</h2>
//               <p>
//                 A journey of knowledge and inspiration through our comprehensive
//                 blog. From expert perspectives to practical tips, explore
//                 diverse topics that empower your well-being. Uncover valuable
//                 insights for a healthier life.
//               </p>

//               <h3>Sign up to get latest updates</h3>
//               <div className="latest-news">
//                 <input
//                   className="latest-newsbox"
//                   type="text"
//                   placeholder="Email address"
//                   name="name"
//                   required=""
//                 />
//                 <button type="submit" name="en" className="news-button">
//                   Sign Up{" "}
//                   <Image
//                     src="/images/2023/01/arrow-w.png"
//                     alt="icon"
//                     width="10"
//                     height="10"
//                   />
//                 </button>
//               </div>
//             </div>

//             <div className="homeblog-right">
//               <div className="owl-slider">
//                 <div id="blog">
//                   <Carousel
//                     responsive={responsive}
//                     arrows={false}
//                     itemClass="carousel-item"
//                     infinite={true}
//                     draggable={true}
//                     swipeable={true}
//                   >
//                     {blog &&
//                       blog.map((e) => (
//                         <div className="carousel-item" key={e.id}>
//                           <div className="blog-item">
//                             <Image
//                               src={`https://dev.medflick.com/blog/${e.icon}`}
//                               alt={e.slug}
//                               width="324"
//                               height="249"
//                             />
//                             <Link href={`/blog/${e.slug}`}>
//                               <h4 style={{ color: "#000" }}>{e.name}</h4>
//                             </Link>
//                             {/* <div className="blog-drop">
//                             Lorem ipsum dolor sit amet, consectetur adipiscing
//                             elit, sed do eiusmod tempor incididunt ut labore Ut
//                             enim ad minim veniam, quis nostrud exercitation
//                             ullamco laboris nisi ut aliquip
//                           </div> */}
//                             <div
//                               className="blog-drop"
//                               dangerouslySetInnerHTML={{
//                                 __html: e.short_description,
//                               }}
//                             />
//                             <div className="blog-text">
//                               <div className="category-blog">
//                                 <span>
//                                   <img
//                                     src="/images/2023/01/dotted.png"
//                                     alt="icon-img"
//                                   />
//                                 </span>
//                                 Category
//                               </div>
//                               <div className="time-blog">
//                                 <span>
//                                   <img
//                                     src="/images/2023/01/dotted.png"
//                                     alt="icon-img"
//                                   />
//                                 </span>
//                                 12 min read
//                               </div>
//                               <Link href={`/blog/${e.slug}`}>
//                                 <img
//                                   src="/images/2023/01/blog-more.png"
//                                   alt="icon-img"
//                                 />
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                       ))}

//                     {/* <div className="carousel-item">
//                       <div className="blog-item">
//                         <Image src="images/2023/01/10/1.jpg" />
//                         <h4>Lorem ipsum dolor sit amet</h4>
//                         <div className="blog-drop">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore Ut
//                           enim ad minim veniam, quis nostrud exercitation
//                           ullamco laboris nisi ut aliquip
//                         </div>
//                         <div className="blog-text">
//                           <div className="category-blog">
//                             <span>
//                               <Image src="images/2023/01/dotted.png" />
//                             </span>
//                             Category
//                           </div>
//                           <div className="time-blog">
//                             <span>
//                               <Image src="images/2023/01/dotted.png" />
//                             </span>
//                             12 min read
//                           </div>
//                           <Link href="/">
//                             <Image src="images/2023/01/blog-more.png" />
//                           </Link>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="carousel-item">
//                       <div className="blog-item">
//                         <Image src="images/2023/01/10/1.jpg" />
//                         <h4>Lorem ipsum dolor sit amet</h4>
//                         <div className="blog-drop">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore Ut
//                           enim ad minim veniam, quis nostrud exercitation
//                           ullamco laboris nisi ut aliquip
//                         </div>
//                         <div className="blog-text">
//                           <div className="category-blog">
//                             <span>
//                               <Image src="images/2023/01/dotted.png" />
//                             </span>
//                             Category
//                           </div>
//                           <div className="time-blog">
//                             <span>
//                               <Image src="images/2023/01/dotted.png" />
//                             </span>
//                             12 min read
//                           </div>
//                           <Link href="/">
//                             <Image src="images/2023/01/blog-more.png" />
//                           </Link>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="carousel-item">
//                       <div className="blog-item">
//                         <Image src="images/2023/01/10/1.jpg" />
//                         <h4>Lorem ipsum dolor sit amet</h4>
//                         <div className="blog-drop">
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit, sed do eiusmod tempor incididunt ut labore Ut
//                           enim ad minim veniam, quis nostrud exercitation
//                           ullamco laboris nisi ut aliquip
//                         </div>
//                         <div className="blog-text">
//                           <div className="category-blog">
//                             <span>
//                               <Image src="images/2023/01/dotted.png" />
//                             </span>
//                             Category
//                           </div>
//                           <div className="time-blog">
//                             <span>
//                               <Image src="images/2023/01/dotted.png" />
//                             </span>
//                             12 min read
//                           </div>
//                           <Link href="/">
//                             <Image src="images/2023/01/blog-more.png" />
//                           </Link>
//                         </div>
//                       </div>
//                     </div> */}
//                   </Carousel>
//                 </div>
//               </div>
//               <Link className="see-more" href="/blogs">
//                 View more resources{" "}
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Blog;
