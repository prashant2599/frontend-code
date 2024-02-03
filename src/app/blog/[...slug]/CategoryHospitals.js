import Link from "next/link";

const CategoryHospitals = ({ hospital }) => {
  return (
    <>
      {hospital && hospital.length > 0 ? (
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
              {hospital.map((e) => (
                <Link href={`/hospital/${e.slug}`} key={e.id}>
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
