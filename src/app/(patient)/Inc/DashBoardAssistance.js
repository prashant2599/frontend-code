import { FaWhatsapp } from "react-icons/fa";

const DashBoardAssistance = () => {
  return (
    <>
      <section id="section-assistance">
        <div className="midbox-inner wiki-mk">
          <ul>
            <li>
              <h3>Call Us</h3>
              <p>
                {" "}
                For inquiries and assistance, please feel free to reach out.
              </p>
              <a href="#/" className="get-help">
                {" "}
                Get Help
              </a>
            </li>
            <li>
              <h3>WhatsApp</h3>
             
              {/* <img src="/images/whatsApp.png" /> */}
              <p> Connect with us on WhatsApp for quick support.</p>
              <a href="#/" className="get-help">
                {" "}
                Get Help
              </a>
            </li>
            <li>
              <h3>Live Chat</h3>
              <p>Chat with us for real-time assistance.</p>
              <a href="#/" className="get-help">
                {" "}
                Get Help
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default DashBoardAssistance;
