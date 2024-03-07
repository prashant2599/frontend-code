import Link from "next/link";

const NewVisaTravelSection = () => {
  return (
    <>
      <section id="home-travel-support">
        <div className="midbox-inner wiki-mk">
          <h2>Visa & Travel Support</h2>
          <p>
            We assist you in curating your Journey to India for your medical
            treatment, where your comfort is our priority. Entrust us with your
            travel plannings visa arrangements & personalized Travel Plan.
          </p>

          <Link href="/get-visa-assistance">
            Get Visa Assistance{" "}
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/new-images/2023/01/pack-arrow.png`}
              alt="visa-assistance-arrow"
            />
          </Link>
        </div>
      </section>
    </>
  );
};

export default NewVisaTravelSection;
