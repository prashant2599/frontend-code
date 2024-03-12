import Link from "next/link";

const TreatmentBlog = ({ blog }) => {
  const shouldRenderSection = blog.length > 0;
  const blog1 = blog?.slice(0, 3) ?? [];
  const options = { year: "numeric", month: "long", day: "numeric" };
  return (
    <>
      {shouldRenderSection && (
        <section id="home-latest-resources">
          <div className="midbox-inner wiki-mk">
            <h2>Our Latest Resources</h2>

            <div className="blogs-box">
              {blog1.map((e) => {
                const createdAtDate = new Date(e.created_at);
                const formattedDate = createdAtDate.toLocaleDateString(
                  undefined,
                  options
                );

                return (
                  <div className="blog-item" key={e.id}>
                    {e.icon ? (
                      <img
                        src={`https://dev.medflick.com/blog/${e.icon}`}
                        alt={e.name}
                      />
                    ) : null}
                    <Link href={`/blog/${e.slug}`}>
                      <h3>{e.name}</h3>
                    </Link>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: e.short_description
                          ? e.short_description.length > 110
                            ? e.short_description.slice(0, 110).concat("...")
                            : e.short_description
                          : "",
                      }}
                    />

                    <div className="blog-text">
                      <div className="category-blog">
                        <span>
                          <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/dot.webp`}
                            alt="category icon"
                          />
                        </span>
                        {formattedDate}{" "}
                        {/* Display the formatted creation date here */}
                      </div>
                      <div className="time-blog">
                        <span>
                          <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/dot.webp`}
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
                View All{" "}
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/new-images/2023/01/arrow-c.png`}
                  alt=""
                />
              </span>
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default TreatmentBlog;
