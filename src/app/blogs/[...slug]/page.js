import Link from "next/link";
import Image from "next/image";
import PaginationBlogs from "./PaginationBlogs";
import { notFound } from "next/navigation";

function formatText(text) {
  if (typeof text === "string") {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    // Handle the case where 'text' is not a string or is undefined
    return "Invalid input"; // Or any other appropriate error handling
  }
}

const page = async ({ params }) => {
  try {
    const combinedSlug = params.slug.join("/");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${combinedSlug}`,
      {
        cache: "no-store",
      }
    );
    const datas = await res.json();
    const blogs = datas.data.blogs;

    const parts = combinedSlug.split("/");

    const number = parts[1];

    const category = parts[0];

    // const blog1 = blogs?.slice(0, 1) ?? [];
    // const blog2 = blogs?.slice(1, 2) ?? [];
    // const blog3 = blogs?.slice(2, 3) ?? [];
    // const blog4 = blogs?.slice(3, 4) ?? [];
    // const blog5 = blogs?.slice(4, 5) ?? [];

    // const speciality = formatText(combinedSlug);

    // const options = { year: "numeric", month: "long", day: "numeric" };

    // // time 1

    // const createdAt1 = blog1[0].created_at;

    // const createdAtDate1 = new Date(createdAt1);

    // // Create options for formatting the date

    // // Use toLocaleDateString() to format the date
    // const formattedDate1 = createdAtDate1.toLocaleDateString(undefined, options);

    // // time 2

    // const createdAt2 = blog2 && blog2.length > 0 ? blog2[0].created_at : null;

    // const createdAtDate2 = new Date(createdAt2);

    // // Create options for formatting the date

    // // Use toLocaleDateString() to format the date
    // const formattedDate2 = createdAtDate2.toLocaleDateString(undefined, options);

    // // time 3

    // const createdAt3 = blog3 && blog3.length > 0 ? blog3[0].created_at : null;

    // const createdAtDate3 = new Date(createdAt3);

    // // Create options for formatting the date

    // // Use toLocaleDateString() to format the date
    // const formattedDate3 = createdAtDate3.toLocaleDateString(undefined, options);

    // // time 4

    // const createdAt4 = blog4 && blog4.length > 0 ? blog4[0].created_at : null;

    // const createdAtDate4 = new Date(createdAt4);

    // // Create options for formatting the date

    // // Use toLocaleDateString() to format the date
    // const formattedDate4 = createdAtDate4.toLocaleDateString(undefined, options);

    // // time 5

    // const createdAt5 = blog5 && blog5.length > 0 ? blog5[0].created_at : null;

    // const createdAtDate5 = new Date(createdAt5);

    // // Create options for formatting the date

    // // Use toLocaleDateString() to format the date
    // const formattedDate5 = createdAtDate5.toLocaleDateString(undefined, options);

    return (
      <>
        <PaginationBlogs blogs={blogs} number={number} category={category} />

        {/* <section className="bloglist-section">
        <div className="midbox-inner  wiki-mk">
          <div className="bloglist-itembox">
            <div className="bloglist-itemleft">
              <h3>{speciality} Blogs</h3>

              <div className="bloglist-itemmid">
                {blog1.map((e) => (
                  <div className="bloglist-leftbox" key={e.id}>
                    <div className="bloglist-item">
                      <img
                        src={`https://dev.medflick.com/blog/${e.icon}`}
                        alt={e.name}
                      />
                      <Link href={`/blog/${e.slug}`}>
                        <h4>{e.name}</h4>
                      </Link>
                      <div className="blog-datalist">{formattedDate1}</div>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: e.short_description,
                        }}
                      />
                    </div>
                  </div>
                ))}

                <div className="bloglist-midbox">
                  <ul>
                    {blog2.map((e) => (
                      <li key={e.id}>
                        <div className="blogright-img">
                          <Image
                            src={`https://dev.medflick.com/blog/${e.icon}`}
                            alt={e.name}
                            width="192"
                            height="72"
                          />
                        </div>
                        <div className="blogright-details">
                          <Link href={`/blog/${e.slug}`}>
                            <h4>{e.name.slice(0, 40)}... </h4>
                          </Link>
                          <div className="blog-datalist">{formattedDate2}</div>
                        </div>
                      </li>
                    ))}
                    {blog3.map((e) => (
                      <li key={e.id}>
                        <div className="blogright-img">
                          <Image
                            src={`https://dev.medflick.com/blog/${e.icon}`}
                            alt={e.name}
                            width="192"
                            height="72"
                          />
                        </div>
                        <div className="blogright-details">
                          <Link href={`/blog/${e.slug}`}>
                            <h4>{e.name.slice(0, 40)}... </h4>
                          </Link>
                          <div className="blog-datalist">{formattedDate3}</div>
                        </div>
                      </li>
                    ))}
                    {blog4.map((e) => (
                      <li key={e.id}>
                        <div className="blogright-img">
                          <Image
                            src={`https://dev.medflick.com/blog/${e.icon}`}
                            alt={e.name}
                            width="192"
                            height="72"
                          />
                        </div>
                        <div className="blogright-details">
                          <Link href={`/blog/${e.slug}`}>
                            <h4>{e.name.slice(0, 40)}... </h4>
                          </Link>
                          <div className="blog-datalist">{formattedDate4}</div>
                        </div>
                      </li>
                    ))}
                    {blog5.map((e) => (
                      <li key={e.id}>
                        <div className="blogright-img">
                          <Image
                            src={`https://dev.medflick.com/blog/${e.icon}`}
                            alt={e.name}
                            width="192"
                            height="72"
                          />
                        </div>
                        <div className="blogright-details">
                          <Link href={`/blog/${e.slug}`}>
                            <h4>{e.name.slice(0, 40)}... </h4>
                          </Link>
                          <div className="blog-datalist">{formattedDate5}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      </>
    );
  } catch (error) {
    if (error) {
      notFound();
    }
  }
};

export default page;

export async function generateMetadata({ params }) {
  const combinedSlug = params.slug.join("/");
  return {
    alternates: {
      canonical: `https://medflick.com/blogs/${combinedSlug}`,
    },
  };
}
