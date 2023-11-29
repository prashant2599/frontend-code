import Link from "next/link";

const Hospitralspe = ({ hospital, category, categoryName, slugs }) => {
  const Hospitals = hospital?.slice(0, 4) ?? [];

  const parts = slugs.split("/");
  const countrySlug = parts[1];
  return (
    <>
      <section id="hometop-find-treatments">
        <div className="midbox-inner wiki-mk">
          <div className="new-beginnings">
            <div className="new-beginnings-left">
              {countrySlug === undefined ? (
                <h3>Best {categoryName} Hospitals </h3>
              ) : (
                <h3>
                  Best {categoryName} Hospitals in <span style={{color:"#ff6800"}}>{countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)}</span>
                </h3>
              )}
            </div>
            <div className="new-beginnings-right">
              <Link className="view-all" href={`/hospitals/${category}`}>
                View All <img src="/images/new-images/2023/01/treatments-arrow.png" />
              </Link>
            </div>
          </div>
          <div class="home-hospitals">
            {Hospitals.map((e) => (
              <div class="item" key={e.id}>
                <div class="item-home-expert">
                  <img src={`https://dev.medflick.com/hospital/${e.image}`} />
                </div>
                <div class="home-expert-text">
                  <h3>{e.name}</h3>
                  <p>Hospitals in India</p>
                </div>
                <div class="expert-button">
                  <Link class="view-profile" href={`/hospital/${e.slug}`}>
                    View Profile
                  </Link>
                  <a class="book-appointment" href="#">
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

export default Hospitralspe;
