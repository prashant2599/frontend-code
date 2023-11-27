import Link from "next/link";
import getALLFeaturedBlogs from "../lib/getAllFeaturedBlogs";
const TreadingBlogs = async () => {
  // featured Blogs

  const featured = await getALLFeaturedBlogs();

  const Fblog = featured.data.featured;
  return (
    <>
      <ul>
        {Fblog.map((e) => (
          <li key={e.id}>
            {e.icon ? (
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${e.icon}`}
                alt={e.name}
                className="popular-blog-img"
              />
            ) : null}

            <Link href={`/blog/${e.slug}`}>
              <h3>{e.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TreadingBlogs;
