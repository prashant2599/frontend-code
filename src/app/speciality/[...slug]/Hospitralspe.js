import Link from "next/link";

const Hospitralspe = ({ hospital, category }) => {
  const Hospitals = hospital?.slice(0, 4) ?? [];
  return (
    <>
      <section id="hometop-find-treatments">
        <div className="midbox-inner wiki-mk">
          <div className="new-beginnings">
            <div className="new-beginnings-left">
              <h3>Lorem Ipsum Doctors in India</h3>
            </div>
            <div className="new-beginnings-right">
              <Link className="view-all" href={`/hospitals/${category}`}>
                View All <img src="/new-images/2023/01/treatments-arrow.png" />
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
