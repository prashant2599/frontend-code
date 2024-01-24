import Link from "next/link";
import getAllSpeciality from "../lib/getAllSpeciality";
import NumberPage from "./NumberPage";
import getALLTreadingBlogs from "../lib/getAllTreadingBlogs";

import getALLBlogList from "../lib/getAllBlogList";
import TreadingBlogs from "./TreadingBlogs";

const NewBlogPage = async ({ blog, pageNumber, totalCount }) => {
  const data = await getAllSpeciality();
  const speciality = data.data.Speciality;

  // Treading Blogs

  const treanding = await getALLTreadingBlogs();

  const Tblog = treanding.data.trendingdBlog;

  //  recent blogs

  const recent = await getALLBlogList();
  const Rblog = recent.bloglist.data;

  return (
    <>
      <section id="blog-list-medflick">
        <div className="midbox-inner  wiki-mk">
          <h1>
            Healthcare <span>Blogs</span>
          </h1>

          <h2>Popular Post</h2>

          <TreadingBlogs />
        </div>
      </section>

      <section className="blog-list-medflick">
        <div className="midbox-inner  wiki-mk">
          <div className="blog-box-medflick">
            <div className="blog-left-medflick">
              <ul>
                {blog.map((e) => (
                  <li key={e.id}>
                    <Link href={`/blog/${e.slug}`}>
                      {e.icon ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${e.icon}`}
                          alt={e.name}
                        />
                      ) : null}

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

              <NumberPage pageNumber={pageNumber} totalCount={totalCount} />
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
                {Tblog.map((e) => (
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
                {/* {uniqueLocations.map((blog) => {
                  const matchingSpecialities = speciality.filter(
                    (speciality) => String(speciality.id) === String(blog)
                  );

                  // console.log("Matching Specialities:", uniqueLocations);
                  return matchingSpecialities.map((e) => (
                    <li key={e.id}>
                      <Link href={`/blogs/${e.slug}`}>{e.name} Blogs</Link>
                    </li>
                  ));
                })} */}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewBlogPage;
