"use client";
import React, { useRef, useState, createRef } from "react";

const NewVideoSection = () => {
  const videoSources = [
    "https://medflick-frontend.s3.ap-south-1.amazonaws.com/Pain.mp4",
    "https://medflick-frontend.s3.ap-south-1.amazonaws.com/DrSanjay.mp4",
    // Add more video sources as needed
  ];
  const [playingIndex, setPlayingIndex] = useState(null);
  const videoRefs = useRef(
    Array(videoSources.length)
      .fill(null)
      .map(() => React.createRef())
  );

  const handleTogglePlay = (index) => {
    setPlayingIndex((prevIndex) => {
      if (prevIndex !== null && prevIndex !== index) {
        // Pause the previously playing video
        videoRefs.current[prevIndex].current.pause();
      }

      if (prevIndex === index) {
        // Toggle pause/play for the clicked video
        const video = videoRefs.current[index].current;
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }

        return prevIndex;
      } else {
        // Play the clicked video
        videoRefs.current[index].current.play();
        return index;
      }
    });
  };

  return (
    <>
      <section id="home-expert-video">
        <div className="midbox-inner wiki-mk">
          <div className="home-expert-video">
            <div className="home-expert-video-left">
              <h2>
                <span>MedTalk</span>
                Get Expert Insights and Cutting-Edge Wisdom
              </h2>
              <p>
                Watch authentic medical information with up-to-the-minute
                advancements, techniques, and patient-centered approaches coming
                directly from top rated doctors/ surgeons/ experts and take
                control of your health decision-making.
              </p>
              {/* <a href="#">
                {" "}
                View All <img src="/new-images/2023/01/arrow-c.png" alt="" />
              </a> */}
            </div>

            <div className="home-expert-video-right">
              {videoSources.map((source, index) => (
                <div className="expert-video-item" key={index}>
                  <div className="item-home-expert">
                    <video
                      ref={videoRefs.current[index]}
                      loop
                      muted
                      playsInline
                    >
                      <source src={source} type="video/mp4" />
                    </video>
                    {playingIndex !== index && (
                      <div
                        className="video-iconbox"
                        onClick={() => handleTogglePlay(index)}
                        style={{ cursor: "pointer" }}
                      >
                        <img src="/images/icon.webp" alt="Video Icon" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* <div className="video-modal">
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
                </div> */}

              {/* <div className="expert-video-item">
                <div className="item-home-expert">
                  <img src="/new-images/2023/01/09/1.jpg" />
                  <div className="video-iconbox">
                    <a href="#">
                      {" "}
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
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewVideoSection;
