import React from 'react'

const page =async ({params}) => {
    const combinedSlug = params.slug.join("/");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/question/${combinedSlug}`,
      { cache: "no-store" }
    );
  return (
    <div>page</div>
  )
}

export default page