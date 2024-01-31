import Link from "next/link";

const TreatmentList = ({ speciality, slugs }) => {
  const parts = slugs.split("/");
  const specialitySlug = parts[0];
  const countrySlug = parts[1];

  return (
    <>
      <ul>
        {speciality.length > 0 ? (
          speciality.map((e) => (
            <li key={e.id}>
              <img
                src={`https://dev.medflick.com/treatments/${e.home_image}`}
                alt={e.name}
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
                    <div className="cost">{e.price}</div>
                  </div>
                  <div className="packages-details">
                    {e.short_description && (
                      <>
                        {e.short_description.slice(0, 120)}
                        {e.short_description.length > 120 && "...."}
                      </>
                    )}
                  </div>

                  <div>
                    <img
                      src="/images/2023/01/pack-arrow.png"
                      className="arrow-link"
                      alt="arrow"
                    />
                  </div>
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
