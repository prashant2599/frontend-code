import Script from "next/script";
import Link from "next/link";
import { GoChevronDown } from "react-icons/go";
import getAllSpeciality from "@/app/lib/getAllSpeciality";
import MobileSearch from "../../Inc/MobileSearch";
import MobileHeader from "../../Inc/MobileHeader";
import LoginButton from "../../Inc/LoginButton";

const NewHeader = async () => {
  const data = await getAllSpeciality();
  const speciality = data.data.Speciality;
  return (
    <>
      <header className="header" id="header-id">
        <div className="headerTertiary">
          <Link href="/" target="_self" className="logo-d">
            {" "}
            <img src="/images/2023/01/logo.png" alt="Medflick" />
          </Link>
          <div className="topnav-right page-header">
            <nav>
              <div className="top-menu-wrapper">
                <ul className="top-menu">
                  <li className="has-dropdown dropdown">
                    <a href="#" className="dropbtn">
                      Treatments
                      <i>
                        <GoChevronDown style={{ fontSize: "22px" }} />
                      </i>
                    </a>
                    <div className="dropdown-content">
                      <ul>
                        {speciality.map((e) => (
                          <li key={e.id}>
                            <Link
                              href="/speciality/[slug]/[country]"
                              as={`/speciality/${e.slug}`}
                            >
                              <img
                                src={`https://dev.medflick.com/speciality/${e.icon}`}
                                alt={e.name}
                              />
                              {e.name}
                              {/* <span>Lorem ipsum dolor sit amet</span> */}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>

                  <li className="has-dropdown dropdown">
                    <a href="#" className="dropbtn">
                      Hospitals
                      <i>
                        <GoChevronDown style={{ fontSize: "22px" }} />
                      </i>
                    </a>
                    <div className="dropdown-content">
                      <ul>
                        {speciality.map((e) => (
                          <li key={e.id}>
                            <Link href={`/hospitals/${e.slug}`}>
                              <img
                                src={`https://dev.medflick.com/speciality/${e.icon}`}
                                alt={`${e.name} hospitals`}
                              />
                              {e.name} Hospitals
                              {/* <span>Lorem ipsum dolor sit amet</span> */}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>

                  <li className="has-dropdown dropdown">
                    <a href="#" className="dropbtn">
                      Doctors
                      <i>
                        <GoChevronDown style={{ fontSize: "22px" }} />
                      </i>
                    </a>
                    <div className="dropdown-content">
                      <ul>
                        {speciality.map((e) => (
                          <li key={e.id}>
                            <Link href={`/doctors/${e.slug}`}>
                              <img
                                src={`https://dev.medflick.com/speciality/${e.icon}`}
                                alt={`${e.name} doctors`}
                              />
                              {e.name} Doctors
                              {/* <span>Lorem ipsum dolor sit amet</span> */}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>

                  <li>
                    <Link href="/blogs">Blogs</Link>
                  </li>
                  <li>
                    <Link href="/question-answer"> Q&A </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <LoginButton />
        </div>

        <MobileHeader speciality={speciality} />
      </header>
      <Script
        id="scroll-handler-script"
        dangerouslySetInnerHTML={{
          __html: `
                    window.onscroll = function () {
                      myFunction();
                    };
    
                    var header = document.getElementById("header-id");
                    var sticky = header.offsetTop;
    
                    function myFunction() {
                      if (window.pageYOffset > sticky) {
                        header.classList.add("sticky");
                      } else {
                        header.classList.remove("sticky");
                      }
                    }
                  `,
        }}
      ></Script>
    </>
  );
};

export default NewHeader;
