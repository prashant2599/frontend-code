import getAllSpeciality from "@/app/lib/getAllSpeciality";
import Link from "next/link";

const NewQuestionAns = async () => {
  const data = await getAllSpeciality();
  const qa = data.data.qa;
  const limitedData = qa?.slice(0, 4) ?? [];
  return (
    <>
      <section id="home-health-queries">
        <div className="midbox-inner wiki-mk">
          <h2>
            Get answers to your <span>health queries</span>
          </h2>
          <h6>
            Meet the compassionate souls behind our services. Our dedicated team
            of professionals is here to ensure you receive the best care, always
          </h6>

          <div className="healthcare-professionals">
            {limitedData.map((e) => (
              <div
                className="professionals animation-element slide-up in-view"
                key={e.id}
              >
                <div className="professionals-box">
                  <img
                    src="/images/new-images/2023/01/icon-m.png"
                    alt="medflick-questions"
                  />
                  <div className="question-box">{e.short_description}</div>

                  <div
                    className="question-ans"
                    dangerouslySetInnerHTML={{
                      __html: e.long_description
                        .split(" ")
                        .slice(0, 30)
                        .join(" ")
                        .concat("..."),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <Link href="/question-answer">
            View All Questions
            <img src="/images/new-images/2023/01/arrow-c.png" alt="" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default NewQuestionAns;
