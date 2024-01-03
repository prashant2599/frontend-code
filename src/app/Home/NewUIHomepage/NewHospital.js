import "./newsection.css";
import getAllHospitals from "@/app/lib/getAllHospitals";
import Link from "next/link";

const NewHospital = async () => {
  const data = await getAllHospitals();
  const hospital = data.data.hospital;
  const featuredHospitals = hospital.filter(
    (hospital) => hospital.featured === "1"
  );
  return (
    <>
      <section id="hospital-section">
        {/* <h3>Trusted by lorem ipsum dolor sit</h3> */}
        <div className="marquee-wrapper">
          <div className="marquee" style={{ animationDuration: "11s" }}>
            {featuredHospitals.map((e) => (
              <div className="Marquee-tag" key={e.id}>
                <Link href={`/hospital/${e.slug}/${e.country}`}>
                  <img
                    className="dr-img"
                    src={`https://dev.medflick.com/hospital/${e.icon}`}
                    alt={e.name}
                  />
                </Link>
              </div>
            ))}
            {featuredHospitals.map((e) => (
              <div className="Marquee-tag" key={e.id}>
                <Link href={`/hospital/${e.slug}/${e.country}`}>
                  <img
                    className="dr-img"
                    src={`https://dev.medflick.com/hospital/${e.icon}`}
                    alt={e.name}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewHospital;
