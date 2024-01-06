import Link from "next/link";
import NewHeader from "../Home/NewUIHomepage/inc/NewHeader";
import NewFooter from "../Home/NewUIHomepage/inc/NewFooter";

async function getSpeciality() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/speciality/list`
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async () => {
  const data = await getSpeciality();
  const speciality = data.specialityList.speciality_list;
  const treatment = data.treatemen_list;
  return (
    <>
      <NewHeader />
      <section id="medical-treatments">
        <div className="midbox-inner  wiki-mk">
          <h1>
            Medical <span style={{ color: "#ff6800" }}>Treatments</span>
          </h1>
          {/* <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis
              nostrud exercitation dolor sit
            </p> */}

          <div className="medical-treatments">
            {speciality.map((e) => {
              const galleryImages = treatment.filter(
                (gallery) => gallery.speciality_id === String(e.id)
              );
              return (
                <div className="medical-treatments-box" key={e.id}>
                  <Link href={`/speciality/${e.slug}`}>
                    <h2>{e.name}</h2>
                  </Link>
                  <ul>
                    {galleryImages &&
                      galleryImages.map((p) => (
                        <Link href={`/treatment/${p.slug}`} key={p.id}>
                          <li>{p.name}</li>
                        </Link>
                      ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="treatment-marquee" id="category-marquee">
        <div className="marquee-wrapper">
          <div className="marquee" style={{ animationDuration: "11s" }}>
            <div className="Marquee-tag"> 95% Success Rate </div>
            <div className="Marquee-tag"> 11000+ Top Doctors </div>
            <div className="Marquee-tag"> 150+ Top Hospital </div>
            <div className="Marquee-tag"> 250+ Surgeries </div>
            <div className="Marquee-tag"> 35+ Countries </div>
            <div className="Marquee-tag"> 95% Success Rate </div>
            <div className="Marquee-tag"> 11000+ Top Doctors </div>
            <div className="Marquee-tag"> 150+ Top Hospital </div>
            <div className="Marquee-tag"> 250+ Surgeries </div>
            <div className="Marquee-tag"> 35+ Countries </div>
          </div>
        </div>
      </section>
      <NewFooter />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    openGraph: {
      images: "https://medflick.com/images/2023/02/logo.png",
    },
    alternates: {
      canonical: `https://medflick.com/specialities`,
    },
  };
}
