import Link from "next/link";
import Image from "next/image";

const TreatmentList = ({ speciality, slugs }) => {
  const parts = slugs.split("/");
  const specialitySlug = parts[0];
  const countrySlug = parts[1];

  // console.log("position0", specialitySlug);
  // console.log("position1", countrySlug);
  return (
    <>
      <ul>
        {speciality.length > 0 ? (
          speciality.map((e) => (
            <li key={e.id}>
              <Image
                src={`https://dev.medflick.com/treatments/${e.home_image}`}
                alt={e.name}
                width="398"
                height="487"
                className="treatment-mobile-img"
              />
              <Link
                href={
                  countrySlug !== undefined
                    ? `/treatment/${e.slug}/${countrySlug}`
                    : `/treatment/${e.slug}`
                }
              >
                <div className="packages-text">
                  <div className="pack-cost">
                    <div className="pack-name">{e.name} </div>
                    <div className="cost">${e.price}</div>
                  </div>
                  <div className="packages-details">
                    {e.short_description && e.short_description.slice(0, 130)}
                    ....
                  </div>

                  {/* <div
                          className="packages-details"
                          dangerouslySetInnerHTML={{
                            __html: e.short_description,
                          }}
                        /> */}
                  <span>
                    <img
                      src="/images/2023/01/pack-arrow.png"
                      className="arrow-link"
                      alt="arrow"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <>
            <p style={{ textAlign: "center", fontSize: "28px" }}>
              No Treatments Found
            </p>
          </>
        )}
      </ul>
    </>
  );
};

export default TreatmentList;
