import Link from "next/link";

const Community = () => {
  return (
    <>
      <section id="community-section">
        <div className="midbox-inner  wiki-mk">
          <div className="community-pro">
            <img
              className="community-img"
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/02/Community.webp`}
              alt="medflick-community"
            />
            <div className="community-box">
              <h3>Find Your Community. Empower Your Knowledge.</h3>
              <p>
                The worlds most trusted personalized health community with more
                than 1,00, 000 members that share their journey, experiences and
                health insights. Join your community and get access to make
                informed health decisions.
              </p>
              <Link className="more-img" href="/question-answer">
                Explore{" "}
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/2023/02/Vector 85.png`}
                  alt="icon"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Community;
