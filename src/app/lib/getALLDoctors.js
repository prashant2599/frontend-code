
export default async function getAllDoctors() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors`, {
      cache: "no-store",
    });
  
    return res.json();
  }