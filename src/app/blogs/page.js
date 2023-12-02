import Link from "next/link";
import Image from "next/image";
import getALLBlogs from "../lib/getALLBlogs";
import getAllSpeciality from "../lib/getAllSpeciality";
import NewBlogPage from "./NewBlogPage";

const page = async () => {
  const data = await getALLBlogs();
  const blog = data.data.blogs;

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
