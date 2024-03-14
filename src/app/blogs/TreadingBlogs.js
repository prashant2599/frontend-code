import Link from "next/link";
import getALLFeaturedBlogs from "../lib/getAllFeaturedBlogs";
const TreadingBlogs = async () => {
  // featured Blogs

  const featured = await getALLFeaturedBlogs();

  const Fblog = featured.data.featured;

  return (
    <>
     <h2>Popular Post</h2>
      <ul>
        {Fblog.map((e) => (
          <li key={e.id}>
            <Link href={`/blog/${e.slug}`}>
              {e.icon ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE}/blog/${e.icon}`}
                  alt={e.name}
                  // className="popular-blog-img"
                />
              ) : null}

              <h3>{e.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TreadingBlogs;
