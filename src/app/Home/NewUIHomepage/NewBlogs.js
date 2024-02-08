import getALLBlogs from "@/app/lib/getALLBlogs";
import Link from "next/link";

const NewBlogs = async () => {
  const data = await getALLBlogs();
  const blogs = data.data.blogs;
  const blog1 = blogs?.slice(0, 3) ?? [];

  // Create options for formatting the date
  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <>
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
                  <Link href={`/blog/${e.slug}`}>
                    {e.icon ? (
                      <img
                        src={`https://dev.medflick.com/blog/${e.icon}`}
                        alt={e.slug}
                      />
                    ) : null}

                    <h3>{e.name}</h3>
                  </Link>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: e.short_description
                        ? e.short_description.length > 20
                          ? e.short_description.slice(0, 115).concat("...")
                          : e.short_description
                        : "",
                    }}
                  />
                  <div className="blog-text">
                    <div className="category-blog">
                      <span>
                        <img src="/images/dot.webp" alt="category icon" />
                      </span>
                      {formattedDate}{" "}
                      {/* Display the formatted creation date here */}
                    </div>
                    <div className="time-blog">
                      <span>
                        <img src="/images/dot.webp" alt="time icon" />
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
              {" "}
              View All{" "}
              <img src="/images/new-images/2023/01/arrow-c.png" alt="" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default NewBlogs;
