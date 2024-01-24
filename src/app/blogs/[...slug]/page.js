import PaginationBlogs from "./PaginationBlogs";
import { notFound } from "next/navigation";
import NewHeader from "@/app/Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "@/app/Home/NewUIHomepage/inc/NewFooter";

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
    const pageNumber = datas.data.page;
    const totalBlogs = datas.data.count;

    const parts = combinedSlug.split("/");

    const number = parts[1];

    const category = parts[0];

    return (
      <>
        <NewHeader />
        <PaginationBlogs
          blogs={blogs}
          number={number}
          category={category}
          pageNumber={pageNumber}
          totalBlogs={totalBlogs}
        />
        <NewFooter />
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

  const parts = combinedSlug.split("/");

  const number = parts[1];
  return {
    alternates: {
      canonical: `https://medflick.com/blogs/${combinedSlug}`,
    },
  };
}
