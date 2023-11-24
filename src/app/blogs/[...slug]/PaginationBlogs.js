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

const PaginationBlogs = async ({ blogs, number, category }) => {
  const data = await getAllSpeciality();
  const speciality = data.data.Speciality;
  // const blog1 = blogs?.slice(0, 8) ?? [];
  // const blog2 = blogs?.slice(8, 10) ?? [];

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

  const recentTen = Rblog?.slice(0, 10) ?? [];

  const uniqueLocations = [...new Set(Rblog.map((e) => e.speciality_id))];

  return (
    <div>
      <section id="blog-list-medflick">
        <div class="midbox-inner  wiki-mk">
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
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${e.icon}`}
                  alt={e.name}
                />
                <Link href={`/blog/${e.slug}`}>
                  <h3>{e.name}</h3>
                </Link>
              </li>
            ))}

            {/* <li>
              <img src="images/2023/10/01/2.jpg" />
              <h3>
                Lorem ipsum dolor sit amet quia asperna odit sed consequntr
              </h3>
            </li>
            <li>
              <img src="images/2023/10/01/3.jpg" />
              <h3>
                Lorem ipsum dolor sit amet quia asperna odit sed consequntr
              </h3>
            </li>
            <li>
              <img src="images/2023/10/01/4.jpg" />
              <h3>
                Lorem ipsum dolor sit amet quia asperna odit sed consequntr
              </h3>
            </li>
            <li>
              <img src="images/2023/10/01/5.jpg" />
              <h3>Lorem ipsum dolor sit amet </h3>
            </li>
            <li>
              <img src="images/2023/10/01/6.jpg" />
              <h3>
                Lorem ipsum dolor sit amet quia asperna odit sed consequntr
              </h3>
            </li>
            <li>
              <img src="images/2023/10/01/7.jpg" />
              <h3>
                Lorem ipsum dolor sit amet quia asperna odit sed consequntr
              </h3>
            </li>
            <li>
              <img src="images/2023/10/01/8.jpg" />
              <h3>
                Lorem ipsum dolor sit amet quia asperna odit sed consequntr
              </h3>
            </li>
            <li>
              <img src="images/2023/10/01/9.jpg" />
              <h3>
                Lorem ipsum dolor sit amet quia asperna odit sed consequntr
              </h3>
            </li>
            <li>
              <img src="images/2023/10/01/10.jpg" />
              <h3>
                Lorem ipsum dolor sit amet quia asperna odit sed consequntr
              </h3>
            </li>
            <li>
              <img src="images/2023/10/01/11.jpg" />
              <h3>
                Lorem ipsum dolor sit amet quia asperna odit sed consequntr
              </h3>
            </li>
            <li>
              <img src="images/2023/10/01/12.jpg" />
              <h3>
                Lorem ipsum dolor sit amet quia asperna odit sed consequntr
              </h3>
            </li>
            <li>
              <img src="images/2023/10/01/13.jpg" />
              <h3>
                Lorem ipsum dolor sit amet quia asperna odit sed consequntr
              </h3>
            </li>
            <li>
              <img src="images/2023/10/01/14.jpg" />
              <h3>
                Lorem ipsum dolor sit amet quia asperna odit sed consequntr
              </h3>
            </li>
            <li>
              <img src="images/2023/10/01/1.jpg" />
              <h3>
                Lorem ipsum dolor sit amet quia asperna odit sed consequntr
              </h3>
            </li> */}
          </ul>
        </div>
      </section>

      <section class="blog-list-medflick">
        <div class="midbox-inner  wiki-mk">
          <div class="blog-box-medflick">
            <div class="blog-left-medflick">
              <ul>
                {blogs.map((e) => (
                  <li key={e.id}>
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${e.icon}`}
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
                  </li>
                ))}
              </ul>

              {number !== undefined && (
                <div class="list-item-no">
                  <ul>
                    <li>
                      <Link href="/blogs">1</Link>
                    </li>
                    <ul>
                      <li>
                        <Link
                          href={`/blogs/page/${2}`}
                          className={number == 2 ? "active" : ""}
                        >
                          2
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/blogs/page/${3}`}
                          className={number == 3 ? "active" : ""}
                        >
                          3
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/blogs/page/${4}`}
                          className={number == 4 ? "active" : ""}
                        >
                          4
                        </Link>
                      </li>
                    </ul>
                  </ul>
                </div>
              )}
            </div>

            <div class="blog-right-medflick">
              <h4>Recent Posts</h4>
              <ul>
                {recentTen.map((e) => (
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
                {uniqueLocations.map((blog) => {
                  const matchingSpecialities = speciality.filter(
                    (speciality) => String(speciality.id) === String(blog)
                  );

                  // console.log("Matching Specialities:", uniqueLocations);
                  return matchingSpecialities.map((e) => (
                    <li key={e.id}>
                      <Link href={`/blogs/${e.slug}`}>{e.name} Blogs</Link>
                    </li>
                  ));
                })}
              </ul>

              {/* <h4>Trending Posts</h4>
              <ul>
                <li>
                  <a href="#" target="_self">
                    Lorem Ipsum dolor sit amet aliqua id fugiat irure duis ex
                  </a>
                </li>
                <li>
                  <a href="#" target="_self">
                    Lorem Ipsum dolor sit amet aliqua
                  </a>
                </li>
                <li>
                  <a href="#" target="_self">
                    Lorem Ipsum dolor sit amet aliqua id fugiat irure duis ex
                  </a>
                </li>
                <li>
                  <a href="#" target="_self">
                    Lorem Ipsum dolor sit
                  </a>
                </li>
                <li>
                  <a href="#" target="_self">
                    Lorem Ipsum dolor sit amet{" "}
                  </a>
                </li>
                <li>
                  <a href="#" target="_self">
                    Lorem Ipsum dolor sit amet aliqua id fugiat irure duis ex
                  </a>
                </li>
                <li>
                  <a href="#" target="_self">
                    Lorem Ipsum dolor sit amet{" "}
                  </a>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaginationBlogs;
