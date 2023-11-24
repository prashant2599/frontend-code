import getAllSpeciality from "@/app/lib/getAllSpeciality";

const NewTestomonials = async () => {
  const data = await getAllSpeciality();
  const testominial = data.data.testominials;
  return (
    <>
      <section id="home-real-stories">
        <div class="midbox-inner wiki-mk">
          <h2>
            Real Stories, Real Impact <span>Voices of Trust</span>
          </h2>
          <p>
            Meet the compassionate souls behind our services. Our dedicated team
            of professionals is here to ensure you receive the best care, always
          </p>

          <div class="home-our-patients">
            {testominial.map((e) => (
              <div class="our-patients-item" key={e.id}>
                <div class="our-patients-img">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    // poster="https://wgrowth.partners/wwpl/ibshospital_site/images/slider1.jpg"
                  >
                    <source src={e.yt_link} type="video/mp4" />
                  </video>
                  {/* <img src="/new-images/2023/01/10/1.jpg" /> */}
                </div>
                <div class="our-patients-text">
                  <div class="beginnings-head">
                    {/* <h3> “Lorem ipsum dolor sit”</h3> */}
                  </div>
                  {/* <p>
                    orem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi
                  </p> */}
                  <h4>- {e.name}</h4>
                </div>
              </div>
            ))}
          </div>

          <a href="#">
            View All <img src="/new-images/2023/01/arrow-c.png" alt="" />
          </a>
        </div>
      </section>
    </>
  );
};

export default NewTestomonials;
