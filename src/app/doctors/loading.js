
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading = () => {
  return (
    <>
      <section id="find-doctors">
        <div className="midbox-inner  wiki-mk">
          <div className="find-doctor-box">
            <h2>Find Doctors</h2>

            <div className="find-box-list">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search Doctor"
                  name="name"
                  required=""
                  // value={searchQuery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {/* <div className="location-box">
                <input
                  type="text"
                  placeholder="Any Location"
                  name="name"
                  required=""
                />
              </div>
              <button type="submit" name="en" className="find-doctor">
                Find Doctor
              </button> */}
            </div>
          </div>
        </div>
      </section>
      <section id="find-doctors-list">
        <div className="midbox-inner  wiki-mk">
          <div className="doctor-midbox">
            <div className="doctor-midbox-left">
              <div className="doctor-item-list">
                <div className="doctor-item-img">
                  <Skeleton height="181px" width="181px" />
                </div>
                <div className="doctor-item-doc">
                  <h3>
                    {" "}
                    <Skeleton />
                  </h3>

                  <div className="department-sub">
                    <Skeleton />
                  </div>

                  <div className="doc-experience">
                    <div className="years-exper">
                      <Skeleton />
                    </div>
                    <div className="successful-plus">
                      <Skeleton />
                    </div>
                  </div>
                </div>

                <div className="doctor-item-button">
                  <a className="book-app">
                    Book Appointment{" "}
                    <img src="/images/2023/05/book.png" alt="icon" />
                  </a>
                  <a className="view-profile">
                    View Profile{" "}
                    <img src="/images/2023/05/profile.png" alt="icon" />
                  </a>
                  <span style={{ cursor: "pointer" }} className="share-profile">
                    Share Profile{" "}
                    <img src="/images/2023/05/share-profile.png" alt="icon" />
                  </span>
                </div>
              </div>
              <div className="doctor-item-list">
                <div className="doctor-item-img">
                  <Skeleton height="181px" width="181px" />
                </div>
                <div className="doctor-item-doc">
                  <h3>
                    {" "}
                    <Skeleton />
                  </h3>

                  <div className="department-sub">
                    <Skeleton />
                  </div>

                  <div className="doc-experience">
                    <div className="years-exper">
                      <Skeleton />
                    </div>
                    <div className="successful-plus">
                      <Skeleton />
                    </div>
                  </div>
                </div>

                <div className="doctor-item-button">
                  <a className="book-app">
                    Book Appointment{" "}
                    <img src="/images/2023/05/book.png" alt="icon" />
                  </a>
                  <a className="view-profile">
                    View Profile{" "}
                    <img src="/images/2023/05/profile.png" alt="icon" />
                  </a>
                  <span style={{ cursor: "pointer" }} className="share-profile">
                    Share Profile{" "}
                    <img src="/images/2023/05/share-profile.png" alt="icon" />
                  </span>
                </div>
              </div>
              <div className="doctor-item-list">
                <div className="doctor-item-img">
                  <Skeleton height="181px" width="181px" />
                </div>
                <div className="doctor-item-doc">
                  <h3>
                    {" "}
                    <Skeleton />
                  </h3>

                  <div className="department-sub">
                    <Skeleton />
                  </div>

                  <div className="doc-experience">
                    <div className="years-exper">
                      <Skeleton />
                    </div>
                    <div className="successful-plus">
                      <Skeleton />
                    </div>
                  </div>
                </div>

                <div className="doctor-item-button">
                  <a className="book-app">
                    Book Appointment{" "}
                    <img src="/images/2023/05/book.png" alt="icon" />
                  </a>
                  <a className="view-profile">
                    View Profile{" "}
                    <img src="/images/2023/05/profile.png" alt="icon" />
                  </a>
                  <span style={{ cursor: "pointer" }} className="share-profile">
                    Share Profile{" "}
                    <img src="/images/2023/05/share-profile.png" alt="icon" />
                  </span>
                </div>
              </div>
              <div className="doctor-item-list">
                <div className="doctor-item-img">
                  <Skeleton height="181px" width="181px" />
                </div>
                <div className="doctor-item-doc">
                  <h3>
                    {" "}
                    <Skeleton />
                  </h3>

                  <div className="department-sub">
                    <Skeleton />
                  </div>

                  <div className="doc-experience">
                    <div className="years-exper">
                      <Skeleton />
                    </div>
                    <div className="successful-plus">
                      <Skeleton />
                    </div>
                  </div>
                </div>

                <div className="doctor-item-button">
                  <a className="book-app">
                    Book Appointment{" "}
                    <img src="/images/2023/05/book.png" alt="icon" />
                  </a>
                  <a className="view-profile">
                    View Profile{" "}
                    <img src="/images/2023/05/profile.png" alt="icon" />
                  </a>
                  <span style={{ cursor: "pointer" }} className="share-profile">
                    Share Profile{" "}
                    <img src="/images/2023/05/share-profile.png" alt="icon" />
                  </span>
                </div>
              </div>
              <div className="doctor-item-list">
                <div className="doctor-item-img">
                  <Skeleton height="181px" width="181px" />
                </div>
                <div className="doctor-item-doc">
                  <h3>
                    {" "}
                    <Skeleton />
                  </h3>

                  <div className="department-sub">
                    <Skeleton />
                  </div>

                  <div className="doc-experience">
                    <div className="years-exper">
                      <Skeleton />
                    </div>
                    <div className="successful-plus">
                      <Skeleton />
                    </div>
                  </div>
                </div>

                <div className="doctor-item-button">
                  <a className="book-app">
                    Book Appointment{" "}
                    <img src="/images/2023/05/book.png" alt="icon" />
                  </a>
                  <a className="view-profile">
                    View Profile{" "}
                    <img src="/images/2023/05/profile.png" alt="icon" />
                  </a>
                  <span style={{ cursor: "pointer" }} className="share-profile">
                    Share Profile{" "}
                    <img src="/images/2023/05/share-profile.png" alt="icon" />
                  </span>
                </div>
              </div>
              <div className="doctor-item-list">
                <div className="doctor-item-img">
                  <Skeleton height="181px" width="181px" />
                </div>
                <div className="doctor-item-doc">
                  <h3>
                    {" "}
                    <Skeleton />
                  </h3>

                  <div className="department-sub">
                    <Skeleton />
                  </div>

                  <div className="doc-experience">
                    <div className="years-exper">
                      <Skeleton />
                    </div>
                    <div className="successful-plus">
                      <Skeleton />
                    </div>
                  </div>
                </div>

                <div className="doctor-item-button">
                  <a className="book-app">
                    Book Appointment{" "}
                    <img src="/images/2023/05/book.png" alt="icon" />
                  </a>
                  <a className="view-profile">
                    View Profile{" "}
                    <img src="/images/2023/05/profile.png" alt="icon" />
                  </a>
                  <span style={{ cursor: "pointer" }} className="share-profile">
                    Share Profile{" "}
                    <img src="/images/2023/05/share-profile.png" alt="icon" />
                  </span>
                </div>
              </div>
              <div className="doctor-item-list">
                <div className="doctor-item-img">
                  <Skeleton height="181px" width="181px" />
                </div>
                <div className="doctor-item-doc">
                  <h3>
                    {" "}
                    <Skeleton />
                  </h3>

                  <div className="department-sub">
                    <Skeleton />
                  </div>

                  <div className="doc-experience">
                    <div className="years-exper">
                      <Skeleton />
                    </div>
                    <div className="successful-plus">
                      <Skeleton />
                    </div>
                  </div>
                </div>

                <div className="doctor-item-button">
                  <a className="book-app">
                    Book Appointment{" "}
                    <img src="/images/2023/05/book.png" alt="icon" />
                  </a>
                  <a className="view-profile">
                    View Profile{" "}
                    <img src="/images/2023/05/profile.png" alt="icon" />
                  </a>
                  <span style={{ cursor: "pointer" }} className="share-profile">
                    Share Profile{" "}
                    <img src="/images/2023/05/share-profile.png" alt="icon" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default loading;
