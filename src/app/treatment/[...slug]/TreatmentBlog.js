"use client";

import Link from "next/link";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1.4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1.5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const TreatmentBlog = ({ blog }) => {
  const shouldRenderSection = blog.length > 0;
  const blog1 = blog?.slice(0, 3) ?? [];
  const options = { year: "numeric", month: "long", day: "numeric" };
  return (
    <>
      {shouldRenderSection && (
        <section id="home-latest-resources">
          <div class="midbox-inner wiki-mk">
            <h2>Our Latest Resources</h2>

            <div class="blogs-box">
              {blog1.map((e) => {
                const createdAtDate = new Date(e.created_at);
                const formattedDate = createdAtDate.toLocaleDateString(
                  undefined,
                  options
                );

                return (
                  <div class="blog-item" key={e.id}>
                    <img
                      src={`https://dev.medflick.com/blog/${e.icon}`}
                      alt={e.name}
                    />
                    <Link href={`/blog/${e.slug}`}>
                      <h3>{e.name}</h3>
                    </Link>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: e.short_description,
                      }}
                    />
                    <div class="blog-text">
                      <div class="category-blog">
                        <span>
                          <img
                            src="/new-images/2023/01/11/do.png"
                            alt="category icon"
                          />
                        </span>
                        {formattedDate}{" "}
                        {/* Display the formatted creation date here */}
                      </div>
                      <div class="time-blog">
                        <span>
                          <img
                            src="/new-images/2023/01/11/do.png"
                            alt="time icon"
                          />
                        </span>{" "}
                        2 Min Read
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href="/blogs">
              <span className="new-blogs">
                View All <img src="/new-images/2023/01/arrow-c.png" alt="" />
              </span>
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default TreatmentBlog;
