import Link from "next/link";

const CategoryHospitals = async ({ specialityId }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hospital/speciality/id/${specialityId}`,
    {
      cache: "no-store",
    }
  );
  const datas = await res.json();
  const hospitals = datas.hospital_list.sp_hospital_list;
  return (
    <>
      {hospitals && hospitals.length > 0 ? (
        <section id="related-blog">
          <div className="midbox-inner  wiki-mk">
            <div className="blog-content">
              <div className="blog-cont-left">
                <h2>
                  Find Best <span>Hospitals</span>
                </h2>
              </div>
            </div>

            <div className="symptoms-nav">
              {hospitals.map((e) => (
                <Link href={`/hospital/${e.slug}/${e.country}`} key={e.id}>
                  {e.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default CategoryHospitals;
