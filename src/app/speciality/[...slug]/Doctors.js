import Link from "next/link";

const Doctors = ({ doctor, category }) => {
  const Doctors = doctor?.slice(0, 4) ?? [];
  return (
    <>
      <section id="hometop-find-treatments">
        <div className="midbox-inner wiki-mk">
          <div className="new-beginnings">
            <div className="new-beginnings-left">
              <h3>Lorem Ipsum Doctors in India</h3>
            </div>
            <div className="new-beginnings-right">
              <Link className="view-all" href={`/doctors/${category}`}>
                View All <img src="/new-images/2023/01/treatments-arrow.png" />
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
