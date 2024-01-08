import Link from "next/link";

const DashBoardAssistance = () => {
  return (
    <>
      <section id="pay-section">
        <div className="midbox-inner  wiki-mk">
          <div className="pay-box">
            <div className="medflick-payleft">
              <h2>Need Assistance?</h2>
              <p>Can’t find what you’re looking for? Let up help</p>
            </div>
            <div className="medflick-payright">
              <Link href="/contact-us" className="consultation">
                {" "}
                We are here to assist you 24X7
                <img src="/images/2023/01/arrow-c.png" alt="arrow-icons" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashBoardAssistance;
