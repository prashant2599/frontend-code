export default async function getALLBlogList() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog_list`, {
      cache: "no-cache",
    });
  
    return res.json();
  }
  