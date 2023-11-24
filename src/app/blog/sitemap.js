import getALLBlogList from "../lib/getAllBlogList";

export default async function sitemap() {
  const baseUrl = "https://medflick.com";

  // get all blogs details
  // const res = await fetch(`https://dev.medflick.com/api/blog_list`, {
  //   cache: "no-store",
  // });
  const blogdata = await getALLBlogList();

  // const blogdata = await getALLBlogs();
  const blogDet = blogdata.bloglist.data;

  const blogDetailsUrl =
    blogDet?.map((e) => {
      return {
        url: `${baseUrl}/blog/${e.slug}`,
        lastModified: new Date(),
      };
    }) ?? [];

  return [
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
    },
    ...blogDetailsUrl,
  ];
}
