import HomeHospitalForm from "@/app/Home/hospitalForm/HomeHospitalForm";
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
                  Best {categoryName} Hospitals in{" "}
                  <span style={{ color: "#ff6800" }}>
                    {countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)}
                  </span>
                </h3>
              )}
            </div>
            <div className="new-beginnings-right">
              <Link className="view-all" href={`/hospitals/${category}`}>
                View All{" "}
                <img src="/images/new-images/2023/01/treatments-arrow.png" />
              </Link>
            </div>
          </div>
          <div className="home-hospitals">
            {Hospitals.map((e) => (
              <div className="item" key={e.id}>
                <div className="item-home-expert">
                  <Link href={`/hospital/${e.slug}/${e.country}`}>
                    <img src={`https://dev.medflick.com/hospital/${e.image}`} />
                  </Link>
                </div>
                <div className="home-expert-text">
                  <Link href={`/hospital/${e.slug}/${e.country}`}>
                    <h3>{e.name}</h3>
                  </Link>
                  <p>
                    Hospitals in{" "}
                    {e.city && e.city.charAt(0).toUpperCase() + e.city.slice(1)}
                    ,{" "}
                    {e.country &&
                      e.country.charAt(0).toUpperCase() + e.country.slice(1)}
                  </p>
                </div>
                <HomeHospitalForm
                  slug={e.slug}
                  country={e.country}
                  name={e.name}
                  hospitalId={e.id}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hospitralspe;
