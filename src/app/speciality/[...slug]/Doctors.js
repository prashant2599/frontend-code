import Link from "next/link";

const Doctors = ({ doctor, category, categoryName, slugs }) => {
  const Doctors = doctor?.slice(0, 4) ?? [];

  const parts = slugs.split("/");
  const countrySlug = parts[1];
  return (
    <>
      <section id="hometop-find-treatments">
        <div className="midbox-inner wiki-mk">
          <div className="new-beginnings">
            <div className="new-beginnings-left">
              {countrySlug === undefined ? (
                <h3>Best {categoryName} Doctors </h3>
              ) : (
                <h3>
                  Best {categoryName} Doctors in <span style={{color:"#ff6800"}}>{countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)}</span>
                </h3>
              )}
            </div>
            <div className="new-beginnings-right">
              <Link className="view-all" href={`/doctors/${category}`}>
                View All <img src="/images/new-images/2023/01/treatments-arrow.png" />
              </Link>
            </div>
          </div>
          <div className="home-doctors">
            {Doctors.map((e) => (
              <div className="item" key={e.id}>
                <div className="item-home-expert">
                  <img src={`https://dev.medflick.com/doctor/${e.image}`} />
                </div>
                <div className="home-expert-text">
                  <h3>
                    {e.prefix} {e.first_name} {e.last_name}
                  </h3>
                  <p>{e.designation}</p>
                </div>
                <div className="expert-button">
                  <Link className="view-profile" href={`/doctor/${e.slug}`}>
                    View Profile
                  </Link>
                  <a className="book-appointment" href="#">
                    Book Appointment
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Doctors;
