import Link from "next/link";
import getAllSpeciality from "@/app/lib/getAllSpeciality";
import getALLTreadingBlogs from "@/app/lib/getAllTreadingBlogs";
import getALLFeaturedBlogs from "@/app/lib/getAllFeaturedBlogs";
import getALLBlogList from "@/app/lib/getAllBlogList";

function formatText(text) {
  if (typeof text === "string") {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    return "Invalid input";
  }
}

const PaginationBlogs = async ({
  blogs,
  number,
  category,
  totalBlogs,
  pageNumber,
}) => {
  const data = await getAllSpeciality();
  const speciality = data.data.Speciality;

  // Treading Blogs

  const treanding = await getALLTreadingBlogs();

  const Tblog = treanding.data.trendingdBlog;

  // featured Blogs

  const featured = await getALLFeaturedBlogs();

  const Fblog = featured.data.featured;

  const formantCategory = formatText(category);

  // Blog List
  const recent = await getALLBlogList();
  const Rblog = recent.bloglist.data;

  const itemsPerPage = 10; // You can adjust this based on your preference
  // const totalBlogs = Rblog.length;
  const totalPages = Math.ceil(totalBlogs / itemsPerPage);

  // Generate an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <section id="blog-list-medflick">
        <div className="midbox-inner  wiki-mk">
          {category == "page" ? (
            <h1>
              Healthcare <span>Blogs</span>
            </h1>
          ) : (
            <h1>
              {formantCategory} <span>Blogs</span>
            </h1>
          )}

          <h2>Popular Post</h2>

          <ul>
            {Fblog.map((e) => (
              <li key={e.id}>
                {e.icon ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${e.icon}`}
                    alt={e.name}
                  />
                ) : null}
                <Link href={`/blog/${e.slug}`}>
                  <h3>{e.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="blog-list-medflick">
        <div className="midbox-inner  wiki-mk">
          <div className="blog-box-medflick">
            <div className="blog-left-medflick">
              <ul>
                {blogs.map((e) => (
                  <li key={e.id}>
                    {e.icon ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${e.icon}`}
                        alt={e.name}
                      />
                    ) : null}
                    <Link href={`/blog/${e.slug}`}>
                      <h3>{e.name}</h3>
                    </Link>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: e.short_description,
                      }}
                    />
                  </li>
                ))}
              </ul>

              {number !== undefined && (
                <div className="list-item-no">
                  <ul>
                    {pages.map((page) => (
                      <li key={page}>
                        <Link
                          href={page == 1 ? `/blogs` : `/blogs/page/${page}`}
                          className={number == page ? "active" : ""}
                        >
                          {page}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="blog-right-medflick">
              <h4>Recent Posts</h4>
              <ul>
                {Rblog.map((e) => (
                  <li key={e.id}>
                    <Link href={`/blog/${e.slug}`}>{e.name}</Link>
                  </li>
                ))}
              </ul>
              <h4>Trending Posts</h4>

              <ul>
                {Tblog &&
                  Tblog.map((e) => (
                    <li key={e.id}>
                      <Link href={`/blog/${e.slug}`}>{e.name}</Link>
                    </li>
                  ))}
              </ul>

              <h4>Category</h4>
              <ul>
                {speciality.map((e) => (
                  <li key={e.id}>
                    <Link href={`/blogs/${e.slug}`}>{e.name} Blogs</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaginationBlogs;
