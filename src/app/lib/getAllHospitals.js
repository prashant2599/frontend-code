
export default async function getAllHospitals() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hospitals`, {
      cache: "no-store",
    });
  
    return res.json();
  }