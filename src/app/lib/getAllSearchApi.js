export default async function getALLSearchApi() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search`, {
    cache: "no-cache",
  });

  return res.json();
}
