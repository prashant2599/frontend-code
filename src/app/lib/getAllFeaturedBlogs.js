export default async function getALLFeaturedBlogs() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/featureblog`,
      {
        cache: "no-cache",
      }
    );
  
    return res.json();
  }
  