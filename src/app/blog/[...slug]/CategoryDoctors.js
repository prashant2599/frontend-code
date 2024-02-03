import Link from "next/link";

const CategoryDoctors =  ({ doctor }) => {

  return (
    <>
      {doctor && doctor.length > 0 ? (
        <section id="related-blog">
          <div className="midbox-inner  wiki-mk">
            <div className="blog-content">
              <div className="blog-cont-left">
                <h2>
                  Find Best <span>Doctors</span>
                </h2>
              </div>
            </div>

            <div className="symptoms-nav">
              {doctor.map((e) => (
                <Link href={`/doctor/${e.slug}`} key={e.id}>
                  {e.prefix} {e.first_name} {e.last_name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default CategoryDoctors;
