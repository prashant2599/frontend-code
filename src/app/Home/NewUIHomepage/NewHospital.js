import "./newsection.css";
import getAllHospitals from "@/app/lib/getAllHospitals";
import Link from "next/link";
import Marquee from "react-fast-marquee";


const NewHospital = async () => {
  const data = await getAllHospitals();
  const hospital = data.data.hospital;
  const featuredHospitals = hospital.filter(
    (hospital) => hospital.featured === "1"
  );

  const generateHospitalTag = (hospital) => (
    <div className="Marquee-tag" key={hospital.id}>
      <Link href={`/hospital/${hospital.slug}`}>
        <img
          className="dr-img"
          src={`https://dev.medflick.com/hospital/${hospital.icon}`}
          alt={hospital.name}
        />
      </Link>
    </div>
  );

  return (
    <>
      <section id="hospital-section">
        <div className="marquee-wrapper">
          <div className="marquee-new">
          <Marquee pauseOnHover={true} speed={100}>
            {featuredHospitals.map((hospital) => generateHospitalTag(hospital))}
            {featuredHospitals.map((hospital) => generateHospitalTag(hospital))}
            </Marquee>
           
          </div>
        </div>
      </section>

    </>
  );
};

export default NewHospital;
