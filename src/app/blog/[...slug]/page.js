import BlogDForm from "@/app/Home/blogDetailsForm/BlogDForm";
import Link from "next/link";
import Breadcrumb from "./Breadcrumb";
import CategoryWiseBlogDetais from "./CategoryWiseBlogDetais";
import { notFound } from "next/navigation";
import NewHeader from "@/app/Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "@/app/Home/NewUIHomepage/inc/NewFooter";
import CategoryDoctors from "./CategoryDoctors";
import CategoryHospitals from "./CategoryHospitals";
import BlogNewsletter from "./BlogNewsletter";
import getAllSpeciality from "@/app/lib/getAllSpeciality";

const page = async ({ params }) => {
  try {
    const combinedSlug = params.slug.join("/");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${combinedSlug}`,
      {
        cache: "no-store",
      }
    );
    const datas = await res.json();
    const blogDetails = datas.data.blog_info;
    const relatedBlog = datas.data.related_blog;
    const relatedArticles = datas.data.related_article;
    const doctor = datas.data.doctor;
    const hospital = datas.data.hospital;

    const relatedBlog1 = relatedBlog?.slice(0, 3) ?? [];

    //  date showing

    const createdAt = blogDetails.created_at;

    const createdAtDate = new Date(createdAt);

    // Create options for formatting the date
    const options = { year: "numeric", month: "long", day: "numeric" };

    // Use toLocaleDateString() to format the date
    const formattedDate = createdAtDate.toLocaleDateString(undefined, options);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://medflick.com/blog/${combinedSlug}`,
      },
      headline: blogDetails.title,
      description: blogDetails.description,
      image: `https://dev.medflick.com/blog/${blogDetails.icon}`,
      author: {
        "@type": "Organization",
        name: "Medflick",
      },
      publisher: {
        "@type": "Organization",
        name: "Medflick",
        logo: {
          "@type": "ImageObject",
          url: "https://medflick.com/images/2023/02/logo.png",
        },
      },
      // datePublished: "",
    };

    const BreadcrumbList = {
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://medflick.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://medflick.com/blogs",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: blogDetails.name,
          item: `https://medflick.com/blog/${combinedSlug}`,
        },
      ],
    };

    const dataa = await getAllSpeciality();
    const speciality = dataa.data.Speciality;

    const matchingSpeciality = speciality.find(
      (speciality) =>
        String(speciality.id) === String(blogDetails.speciality_id)
    );

    return (
      <>
        <NewHeader />

        <section id="blog-slider">
          {blogDetails.icon ? (
            <img
              src={`https://dev.medflick.com/blog/${blogDetails.icon}`}
              alt="Category"
              className="blog-d"
            />
          ) : null}
          {/* <img src="images/2023/04/blog-m.png" className="blog-m" alt="Category" /> */}
          <div className="blog-slidertext">
            <h1>{blogDetails.name}</h1>
            {/* <p>
            Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
            qui esse pariatur duis deserunt mollit dolore cillum minim tempor
            enim. Elit aute irure tempor cupidatat
          </p> */}
            <div className="blog-datebox">
              <div className="by-box">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/04/icon-two.png`}
                  alt="icon-blog"
                />{" "}
                By -
                {blogDetails.keyword
                  ? blogDetails.keyword
                  : "Dr. Kanika Sharma"}
                {/* <span> Updated on {formattedDate}</span> */}
              </div>
              <div className="by-box">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/date.png`}
                  alt="icon-blog"
                />{" "}
                By -{formattedDate}
                {/* <span> Updated on {formattedDate}</span> */}
              </div>
            </div>
          </div>
        </section>
        <Breadcrumb heading={blogDetails.name} slug={blogDetails.slug} />

        <section id="blog-mid">
          <div className="midbox-inner  wiki-mk">
            <div className="blog-findox">
              <div className="blog-leftbox">
                <div className="blog-nav">
                  <h3>Table of Content</h3>
                  <ul>
                    {blogDetails.heading1 && (
                      <li>
                        <a href="#transplant-nav1" className="active">
                          {blogDetails.heading1}
                        </a>
                      </li>
                    )}
                    {blogDetails.heading2 && (
                      <li>
                        <a href="#transplant-nav2" target="_self">
                          {blogDetails.heading2}
                        </a>
                      </li>
                    )}
                    {blogDetails.heading3 && (
                      <li>
                        <a href="#transplant-nav3" target="_self">
                          {blogDetails.heading3}
                        </a>
                      </li>
                    )}
                    {blogDetails.heading4 && (
                      <li>
                        <a href="#transplant-nav4" target="_self">
                          {blogDetails.heading4}
                        </a>
                      </li>
                    )}
                    {blogDetails.heading5 && (
                      <li>
                        <a href="#transplant-nav5" target="_self">
                          {blogDetails.heading5}
                        </a>
                      </li>
                    )}
                    {blogDetails.heading6 && (
                      <li>
                        <a href="#transplant-nav6" target="_self">
                          {blogDetails.heading6}
                        </a>
                      </li>
                    )}
                    {blogDetails.heading7 && (
                      <li>
                        <a href="#transplant-nav7" target="_self">
                          {blogDetails.heading7}
                        </a>
                      </li>
                    )}
                    {blogDetails.heading8 && (
                      <li>
                        <a href="#transplant-nav8" target="_self">
                          {blogDetails.heading8}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>

                {blogDetails.speciality_id && (
                  <div className="talk-doctor">
                    Talk to a Doctor
                    <Link
                      className="free-quote"
                      href={`/doctors/${matchingSpeciality.slug}`}
                    >
                      View Doctors Listing
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/01/arrow-c.png`}
                        alt="arrow-icon"
                      />
                    </Link>
                  </div>
                )}

                {relatedArticles && relatedArticles.length > 0 ? (
                  <div className="articles-box">
                    Related Articles
                    <ul>
                      {relatedArticles.map(
                        (e) =>
                          // Exclude the current blog from the related articles
                          e.id !== blogDetails.id && (
                            <li key={e.id}>
                              <Link href={`/blog/${e.slug}`}>{e.name}</Link>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="blog-midbox">
                <div className="heading1 blog-scroll" id="transplant-nav1">
                  <h2>{blogDetails.heading1}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blogDetails && blogDetails.long_description,
                    }}
                  />
                </div>
                <div className="heading2 blog-scroll" id="transplant-nav2">
                  <h2>{blogDetails.heading2}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blogDetails && blogDetails.long_description2,
                    }}
                  />
                </div>
                <div className="heading3 blog-scroll" id="transplant-nav3">
                  <h2>{blogDetails.heading3}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blogDetails && blogDetails.long_description3,
                    }}
                  />
                </div>
                <div className="heading4 blog-scroll" id="transplant-nav4">
                  <h2>{blogDetails.heading4}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blogDetails && blogDetails.long_description4,
                    }}
                  />
                </div>
                <div className="heading5 blog-scroll" id="transplant-nav5">
                  <h2>{blogDetails.heading5}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blogDetails && blogDetails.long_description5,
                    }}
                  />
                </div>
                <div className="heading6 blog-scroll" id="transplant-nav6">
                  <h2>{blogDetails.heading6}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blogDetails && blogDetails.long_description6,
                    }}
                  />
                </div>
                <div className="heading7 blog-scroll" id="transplant-nav6">
                  <h2>{blogDetails.heading7}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blogDetails && blogDetails.long_description7,
                    }}
                  />
                </div>
                <div className="heading8 blog-scroll" id="transplant-nav8">
                  <h2>{blogDetails.heading8}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blogDetails && blogDetails.long_description8,
                    }}
                  />
                </div>
              </div>

              <BlogDForm />
            </div>
          </div>
        </section>

        <CategoryWiseBlogDetais speciality={speciality} />
        <CategoryDoctors doctor={doctor} />
        <CategoryHospitals hospital={hospital} />

        <BlogNewsletter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BreadcrumbList) }}
        />
        <NewFooter />
      </>
    );
  } catch (error) {
    if (error) {
      notFound();
    }
  }
};

export default page;

export async function generateMetadata({ params }) {
  const combinedSlug = params.slug.join("/");
  const res = await fetch(`https://dev.medflick.com/api/blog/${combinedSlug}`);
  const datas = await res.json();
  const blogDetails = datas.data.blog_info;

  if (!blogDetails.title)
    return {
      title: "Not Found",
      description: "Not Found",
      alternates: {
        canonical: `https://medflick.com/blog/${combinedSlug}`,
      },
    };

  return {
    title: blogDetails.title,
    description: blogDetails.description,
    openGraph: {
      title: blogDetails.title,
      description: blogDetails.description,
      images: `https://dev.medflick.com/blog/${blogDetails.icon}`,
    },
    alternates: {
      canonical: `https://medflick.com/blog/${combinedSlug}`,
    },
  };
}
