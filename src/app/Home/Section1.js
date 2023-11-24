import Link from "next/link";
import getAllSpeciality from "../lib/getAllSpeciality";

const Section1 = async () => {
  const data = await getAllSpeciality();
  const video = data.data.banner;

  const Dvideo = video.find((blog) => blog.id === 22);
  const Mvideo = video.find((blog) => blog.id === 23);

  return (
    <>
      <section id="slider-section">
        <div class="video-slider">
          <video
            id="bgVideo"
            autoPlay
            loop
            muted
            playsInline
            poster="https://wgrowth.partners/wwpl/ibshospital_site/images/slider1.jpg"
          >
            <source src={Dvideo.yt_link} type="video/mp4" />
          </video>

          <video
            id="bgVideo1"
            autoPlay
            loop
            muted
            playsInline
            poster="https://wgrowth.partners/wwpl/ibshospital_site/images/slider1.jpg"
          >
            <source src={Mvideo.yt_link} type="video/mp4" />
          </video>

          <div className="ababslider-text">
            <h1 className="cs-heading"> Inspiring Better Health</h1>
            <h2 className="cs-heading1">
              Your Path to informed health decisions. Trusted health information
              when you need it most.
            </h2>
            <div className="home-topnav">
              <Link href="/specialities" className="home-nav-left">
                Explore Now
                <img src="/images/2023/01/arrow-c.png" alt="" />
              </Link>
              <Link href="/query" className="home-nav-right">
                Free Treatment Plan{" "}
                <img src="/images/2023/01/arrow-w.png" alt="" />
              </Link>
            </div>
          </div>

          {/* <div class="ababslider-rightext">
            Over 2000+ patients helped. Compassionate care, affordable
            treatments.
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Section1;
