import Link from "next/link";
import getAllSpeciality from "../lib/getAllSpeciality";
import NumberPage from "./NumberPage";
import getALLTreadingBlogs from "../lib/getAllTreadingBlogs";

import getALLBlogList from "../lib/getAllBlogList";
import TreadingBlogs from "./TreadingBlogs";

const NewBlogPage = async ({ blog }) => {
  const data = await getAllSpeciality();
  const speciality = data.data.Speciality;

  // Treading Blogs

  const treanding = await getALLTreadingBlogs();

  const Tblog = treanding.data.trendingdBlog;



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

       <TreadingBlogs />
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

              <NumberPage blogs={Rblog} />
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewBlogPage;
