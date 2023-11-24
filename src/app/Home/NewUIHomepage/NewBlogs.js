import getALLBlogs from "@/app/lib/getALLBlogs";
import Link from "next/link";

const NewBlogs = async () => {
  const data = await getALLBlogs();
  const blogs = data.data.blogs;
  const blog1 = blogs?.slice(0, 3) ?? [];
  return (
    <>
      <section id="home-latest-resources">
        <div class="midbox-inner wiki-mk">
          <h2>Our Latest Resources</h2>

          <div class="blogs-box">
            {blog1.map((e) => (
              <div class="blog-item" key={e.id}>
                <img
                  src={`https://dev.medflick.com/blog/${e.icon}`}
                  alt={e.name}
                />
                <Link href={`/blog/${e.slug}`}>
                  <h3>{e.name}</h3>
                </Link>
                {/* <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit...
                </p> */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: e.short_description,
                  }}
                />
                <div class="blog-text">
                  <div class="category-blog">
                    <span>
                      <img src="/new-images/2023/01/11/do.png" />
                    </span>
                    12th March 2023
                  </div>
                  <div class="time-blog">
                    <span>
                      <img src="/new-images/2023/01/11/do.png" />
                    </span>{" "}
                    2 Min Read
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link href="/blogs">
            <span className="new-blogs">
              {" "}
              View All <img src="/new-images/2023/01/arrow-c.png" alt="" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default NewBlogs;
