import Image from "next/image";

const NewAboutSection = async () => {
  return (
    <>
      <section id="home-medflick-about">
        <div className="midbox-inner wiki-mk">
          <div className="home-medflick-about">
            <div className="home-medflick-about-left">
              <Image width="548" height="585" src="/images/new-images/2023/01/about-us.jpg" alt="medflick-about-us" />
            </div>
            <div className="home-medflick-about-right">
              <h2>
                We push the limits of what&apos;s possible{" "}
                <span>About Medflick</span>
              </h2>
              <p>
                Medflick offers a seamless connection to World&apos;s top doctors and
                specialists, providing assurance that you are receiving optimal
                care. Whether you're seeking to expand your knowledge about a
                medical condition, explore details about a medication or
                treatment procedure, find the best doctors and hospitals,
                connect with experts, or seek medical advice, you've reached the
                right destination. Your health solutions are in easy reach now,
                just a click away.
              </p>

              <ul>
                <li>
                  <img src="/images/12/1.png" alt="" />
                  <h3>Clinical Excellence</h3>
                </li>

                <li>
                  <img src="/images/12/2.png" alt="" />
                  <h3>Personalized Care</h3>
                </li>

                <li>
                  <img src="/images/12/3.png" alt="" />
                  <h3>Quality Standard</h3>
                </li>

                <li>
                  <img src="/images/12/4.png" alt="" />
                  <h3>Best Patient Experience</h3>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewAboutSection;
