import Link from "next/link";
import getAllSpeciality from "../lib/getAllSpeciality";
import NumberPage from "./NumberPage";
import getALLTreadingBlogs from "../lib/getAllTreadingBlogs";
import getALLFeaturedBlogs from "../lib/getAllFeaturedBlogs";
import getALLBlogList from "../lib/getAllBlogList";


const NewBlogPage = async ({ blog }) => {
  const data = await getAllSpeciality();
  const speciality = data.data.Speciality;

  // Treading Blogs

  const treanding = await getALLTreadingBlogs();

  const Tblog = treanding.data.trendingdBlog;

  // featured Blogs

  const featured = await getALLFeaturedBlogs();

  const Fblog = featured.data.featured;

  //  recent blogs

  const recent = await getALLBlogList();
  const Rblog = recent.bloglist.data;

  const recentTen = Rblog?.slice(0, 10) ?? [];

  const uniqueLocations = [...new Set(Rblog.map((e) => e.speciality_id))];
  return (
    <>
      <section id="blog-list-medflick">
        <div class="midbox-inner  wiki-mk">
          <h1>
            Healthcare <span>Blogs</span>
          </h1>

          <h2>Popular Post</h2>

          <ul>
            {Fblog.map((e) => (
              <li key={e.id}>
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${e.icon}`}
                  alt={e.name}
                  className="popular-blog-img"
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
                {blog.map((e) => (
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

              <NumberPage />
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
                {Tblog.map((e) => (
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
    </>
  );
};

export default NewBlogPage;
