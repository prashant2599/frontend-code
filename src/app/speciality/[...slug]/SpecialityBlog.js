import Link from "next/link";
import Image from "next/image";

const SpecialityBlog = ({ blog, category }) => {
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
                          .split(" ")
                          .slice(0, 15)
                          .join(" ")
                          .concat("..."),
                      }}
                    />
                    <div class="blog-text">
                      <div class="category-blog">
                        <span>
                          <img
                            src="/images/new-images/2023/01/11/do.png"
                            alt="category icon"
                          />
                        </span>
                        {formattedDate}{" "}
                      </div>
                      <div class="time-blog">
                        <span>
                          <img
                            src="/images/new-images/2023/01/11/do.png"
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

            <Link href={`/blogs/${category}`}>
              <span className="new-blogs">
                View All{" "}
                <img src="/images/new-images/2023/01/arrow-c.png" alt="" />
              </span>
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default SpecialityBlog;
