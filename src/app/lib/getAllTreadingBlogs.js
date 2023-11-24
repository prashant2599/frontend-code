export default async function getALLTreadingBlogs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/trending_post`,
    {
      cache: "no-cache",
    }
  );

  return res.json();
}
