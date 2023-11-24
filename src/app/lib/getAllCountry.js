export default async function getALLCountry() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctorBYCountry`, {
      cache: "no-cache",
    });
  
    return res.json();
  }
  