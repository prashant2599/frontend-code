export default async function getAllSpeciality() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api`, {
      cache: "no-store",
    });

    if (!res.ok) {
      // If the response status is not OK (e.g., 404 or 500), throw an error
      throw new Error(`Fetch to failed api`);
    }

    return res.json();
  } catch (error) {
    // Handle the error here
    console.error("Error fetching data:", error);
    // You can choose to show an error message to the user, log the error, or take any other action.
    throw error; // You can re-throw the error to propagate it to the caller if needed.
  }
}
