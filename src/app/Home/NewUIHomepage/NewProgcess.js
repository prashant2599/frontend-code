import Link from "next/link";

const NewProgcess = () => {
  return (
    <>
      <section id="hometop-process-treatment">
        <div className="midbox-inner wiki-mk">
          <h2>The Simplest Process in Finding Treatment</h2>

          <ul>
            <li>
              <img src="/images/05/1.webp" alt="compass" />
              <h3>Explore</h3>
              <p>
                Top rated hospitals, best doctors & advanced treatments in India
              </p>
            </li>
            <li>
              <img src="/images/05/2.webp" alt="Watch" />
              <h3>Watch</h3>
              <p>
                Informative expert videos on medical advancements, treatments &
                patient stories
              </p>
            </li>
            <li>
              <img src="/images/05/3.webp" alt="Match" />
              <h3>Match</h3>
              <p>
                Your criteria and we recommend the best hospitals/ top rated
                doctors
              </p>
            </li>
            <li>
              <img src="/images/05/4.webp" alt="Treat" />
              <h3>Treat</h3>
              <p>Finalize your treatment with your chosen hospital/doctor</p>
            </li>
            <li>
              <img src="/images/05/5.webp" alt="Quote" />
              <h3>Quote</h3>
              <p>Get a free quote directly through our website</p>
            </li>
          </ul>

          <Link href="/request-a-free-quote">
            {" "}
            Request a free Quote{" "}
            <img src="/images/new-images/2023/01/arrow-c.png" alt="" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default NewProgcess;
