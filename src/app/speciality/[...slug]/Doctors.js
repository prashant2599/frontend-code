import HomeDoctorForm from "@/app/Home/doctorForm/HomeDoctorForm";
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
                  Best {categoryName} Doctors in{" "}
                  <span style={{ color: "#ff6800" }}>
                    {countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)}
                  </span>
                </h3>
              )}
            </div>
            <div className="new-beginnings-right">
              <Link className="view-all" href={`/doctors/${category}`}>
                View All{" "}
                <img src="/images/new-images/2023/01/treatments-arrow.png" />
              </Link>
            </div>
          </div>
          <div className="home-doctors">
            {Doctors.map((e) => (
              <div className="item" key={e.id}>
                <div className="item-home-expert">
                  <Link href={`/doctor/${e.slug}`}>
                    <img src={`https://dev.medflick.com/doctor/${e.image}`} />
                  </Link>
                </div>
                <div className="home-expert-text">
                  <Link href={`/doctor/${e.slug}`}>
                    <h3>
                      {e.prefix} {e.first_name} {e.last_name}
                    </h3>
                  </Link>
                  <p style={{ height: "37px" }}>{e.designation}</p>
                </div>
                <HomeDoctorForm
                  slug={e.slug}
                  first={e.prefix}
                  middle={e.first_name}
                  last={e.last_name}
                  doctorId={e.id}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Doctors;
