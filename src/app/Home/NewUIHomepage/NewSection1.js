import "./newsection.css";
import Image from "next/image";

const NewSection1 = () => {
  return (
    <>
      <section id="hometop-section">
        <div className="midbox-inner wiki-mk">
          <div className="home-slider">
            <div className="home-slider-left">
              <h1>
                Inspiring Better <span>Health</span>{" "}
              </h1>
              <h2>
                Your Path to Informed Health Decisions. Trusted Health
                Information When you Need it Most.
              </h2>

              <Image
                className="dr-img"
                src="/new-images/2023/01/home-slider.png"
                width="1380"
                height="580"
                alt="inspiring-better-health"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewSection1;
