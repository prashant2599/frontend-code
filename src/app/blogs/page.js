import Link from "next/link";
import Image from "next/image";
import getALLBlogs from "../lib/getALLBlogs";
import getAllSpeciality from "../lib/getAllSpeciality";
import NewBlogPage from "./NewBlogPage";

const page = async () => {
  const data = await getALLBlogs();
  const blog = data.data.blogs;

  // const blog1 = blog?.slice(0, 1) ?? [];
  // const blog2 = blog?.slice(1, 2) ?? [];
  // const blog3 = blog?.slice(2, 3) ?? [];
  // const blog4 = blog?.slice(3, 4) ?? [];
  // const blog5 = blog?.slice(4, 5) ?? [];

  // const ivf2 = blog.find((blog) => blog.id === 9);

  // const options = { year: "numeric", month: "long", day: "numeric" };

  // // time 1

  // const createdAt1 = blog1[0].created_at;

  // const createdAtDate1 = new Date(createdAt1);

  // // Create options for formatting the date

  // // Use toLocaleDateString() to format the date
  // const formattedDate1 = createdAtDate1.toLocaleDateString(undefined, options);

  // // time 2

  // const createdAt2 = blog2[0].created_at;

  // const createdAtDate2 = new Date(createdAt2);

  // // Create options for formatting the date

  // // Use toLocaleDateString() to format the date
  // const formattedDate2 = createdAtDate2.toLocaleDateString(undefined, options);

  // // time 3

  // const createdAt3 = blog3[0].created_at;

  // const createdAtDate3 = new Date(createdAt3);

  // // Create options for formatting the date

  // // Use toLocaleDateString() to format the date
  // const formattedDate3 = createdAtDate3.toLocaleDateString(undefined, options);

  // // time 4

  // const createdAt4 = blog4[0].created_at;

  // const createdAtDate4 = new Date(createdAt4);

  // // Create options for formatting the date

  // // Use toLocaleDateString() to format the date
  // const formattedDate4 = createdAtDate4.toLocaleDateString(undefined, options);

  // // time 5

  // const createdAt5 = blog5[0].created_at;

  // const createdAtDate5 = new Date(createdAt5);

  // // Create options for formatting the date

  // // Use toLocaleDateString() to format the date
  // const formattedDate5 = createdAtDate5.toLocaleDateString(undefined, options);

  return (
    <>
      <NewBlogPage blog={blog} />
    </>
  );
};

export default page;

export async function generateMetadata() {
  const data = await getAllSpeciality();
  // const res = await fetch(`https://dev.medflick.com/api`);
  // const datas = await res.json();
  const navigationheader = data.data.navigationheader;
  const navigation = navigationheader || [];
  const itemWithId13 = navigation.find((e) => e.id === 13);

  return {
    title: itemWithId13.title,
    description: itemWithId13.description,
    openGraph: {
      title: itemWithId13.title,
      description: itemWithId13.description,
      images: "/images/2023/02/logo.png",
    },
    alternates: {
      canonical: `https://medflick.com/blogs`,
    },
  };
}
