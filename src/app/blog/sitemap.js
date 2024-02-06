import getALLBlogList from "../lib/getAllBlogList";
import getALLSearchApi from "../lib/getAllSearchApi";

export default async function sitemap() {
  const baseUrl = "https://medflick.com";

  // get all blogs details
  // const res = await fetch(`https://dev.medflick.com/api/blog_list`, {
  //   cache: "no-store",
  // });
  const blogdata = await getALLSearchApi();

  // const blogdata = await getALLBlogs();
  const blogDet = blogdata.searchData.blog

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
