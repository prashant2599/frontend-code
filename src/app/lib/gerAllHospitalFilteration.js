export default async function getAllHospitalsFilteration() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hospital-list`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}
