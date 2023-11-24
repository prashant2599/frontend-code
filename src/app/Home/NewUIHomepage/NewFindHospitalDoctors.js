import getAllSpeciality from "@/app/lib/getAllSpeciality";
import Link from "next/link";

const NewFindHospitalDoctors = async () => {
  const data = await getAllSpeciality();
  const speciality = data.data.Speciality;
  return (
    <>
      <section id="home-doc-hos">
        <div class="midbox-inner wiki-mk">
          <h2>Find Best Doctors</h2>
          <div class="home-symptoms-nav">
            {speciality.map((e) => (
              <Link href={`/doctors/${e.slug}`} key={e.id}>
                {e.name} Doctors
              </Link>
            ))}
          </div>

          <h2>Find Best Hospitals</h2>
          <div class="home-symptoms-nav">
            {speciality.map((e) => (
              <Link href={`/hospitals/${e.slug}`} key={e.id}>
                {e.name} Hospitals
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewFindHospitalDoctors;
