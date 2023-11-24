import "./newsection.css";
import getAllHospitals from "@/app/lib/getAllHospitals";
import Link from "next/link";

const NewHospital = async () => {
  const data = await getAllHospitals();
  const hospital = data.data.hospital;
  return (
    <>
      <section id="hospital-section">
        {/* <h3>Trusted by lorem ipsum dolor sit</h3> */}
        <div class="marquee-wrapper">
          <div class="marquee" style={{ animationDuration: "11s" }}>
            {hospital.map((e) => (
              <div class="Marquee-tag" key={e.id}>
                <Link href={`/hospital/${e.slug}`}>
                <img
                  class="dr-img"
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
