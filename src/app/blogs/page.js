import getALLBlogs from "../lib/getALLBlogs";
import getAllSpeciality from "../lib/getAllSpeciality";
import NewBlogPage from "./NewBlogPage";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";

const page = async () => {
  const data = await getALLBlogs();
  const blog = data.data.blogs;

  const pageNumber = data.data.page;
  const totalCount = data.data.count;

  return (
    <>
      <NewHeader />
      <NewBlogPage
        blog={blog}
        pageNumber={pageNumber}
        totalCount={totalCount}
      />
      <NewFooter />
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
