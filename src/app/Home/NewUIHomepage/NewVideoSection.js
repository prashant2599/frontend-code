"use client";
import getAllSpeciality from "@/app/lib/getAllSpeciality";
import { useRef, useEffect, useState } from "react";


const NewVideoSection = () => {
  // const data = await getAllSpeciality();
  // const video = data.data.doctor_videos;
  const [video, setVideo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllSpeciality();
        setVideo(result.data.doctor_videos);
      } catch (err) {
        console.log(err.message); // Set the error message in state
      }
    }

    fetchData();
  }, []);
  const video1 = video?.slice(0, 2) ?? [];

  // const videoRef = useRef(null);
  // const [showModal, setShowModal] = useState(false);

  // const playVideo = (e) => {
  //   const video = videoRef.current;
  //   setShowModal(true);
  //   video.play();
  // };

  // const closeVideo = () => {
  //   const video = videoRef.current;
  //   setShowModal(false);
  //   video.pause();
  // };
  return (
    <>
      <section id="home-expert-video">
        <div class="midbox-inner wiki-mk">
          <div class="home-expert-video">
            <div class="home-expert-video-left">
              <h2>
                <span>MedTalk</span>
                Sed ut perspiciatis unde omnis iste natus sit
              </h2>
              <p>
                Watch authentic medical information with up-to-the-minute
                advancements, techniques, and patient-centered approaches coming
                directly from top rated doctors/ surgeons/ experts and take
                control of your health decision-making.
              </p>
              <a href="#">
                {" "}
                View All <img src="/new-images/2023/01/arrow-c.png" alt="" />
              </a>
            </div>

            <div class="home-expert-video-right">
              {video1.map((e) => (
                <div className="expert-video-item" key={e.id}>
                  <div className="item-home-expert">
                    <img src="/new-images/2023/01/09/1.jpg" />
                    <div className="video-iconbox">
                      <a>
                        <img src="/new-images/2023/01/09/icon.png" />
                      </a>
                    </div>
                  </div>
                  <div className="home-expert-text">
                    <h3>Lorem Ipsum dolor sit</h3>
                    <p>
                      Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deseru...
                    </p>
                  </div>
                </div>
              ))}
              {/* {showModal && (
                <div className="video-modal">
                  <div className="video-content">
                    <video
                      key={video1[0].id} // Assuming video1 is an array with at least one element
                      ref={videoRef}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={video1[0].teaser} type="video/mp4" />
                    </video>
                    <button onClick={closeVideo}>Close Video</button>
                  </div>
                </div>
              )} */}

              {/* <div class="expert-video-item">
                <div class="item-home-expert">
                  <img src="/new-images/2023/01/09/1.jpg" />
                  <div class="video-iconbox">
                    <a href="#">
                      {" "}
                      <img src="/new-images/2023/01/09/icon.png" />
                    </a>
                  </div>
                </div>
                <div class="home-expert-text">
                  <h3>Lorem Ipsum dolor sit</h3>
                  <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deseru...
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewVideoSection;
