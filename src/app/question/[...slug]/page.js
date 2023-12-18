import React from "react";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import { FaComments } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import ShareQuestion from "./ShareQuestion";
import UserComment from "./UserComment";

const page = async ({ params }) => {
  const combinedSlug = params.slug.join("/");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/question/${combinedSlug}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  const info = data.qadetails.qadetails;

  const formattedDate = new Date(info.created_at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <>
      <section id="questions-ans-inner">
        <div className="midbox-inner  wiki-mk">
          <div className="questions-ans-inner">
            <div className="questions-inner-head">
              <Link href="/question-answer" className="back-go">
                <i>
                  <IoChevronBack style={{ fontSize: "19px" }} />
                </i>{" "}
                Go Back
              </Link>
              <h1>{info.short_description}</h1>
              <ShareQuestion desc={info.short_description} id={info.id} />
            </div>

            <div className="questions-inner-box">
              <div className="questions-inner-left">
                <img src="/images/icon.jpg" alt="user-profile" />
                <h3>{info.pname} </h3>
              </div>
              <div className="questions-inner-right">
                <div className="questions-data">{formattedDate}</div>
                <div
                  dangerouslySetInnerHTML={{ __html: info.long_description }}
                />

                <div className="questions-inner-comments">
                  <a className="comments-iconbox" href="#">
                    <i>
                      <FaHeart style={{ fontSize: "20px" }} />
                    </i>
                    23 Helpful
                  </a>
                  <a className="comments-iconbox" href="#">
                    <i>
                      <FaComments style={{ fontSize: "20px" }} />
                    </i>
                    1008 Comments
                  </a>
                </div>
                <UserComment
                  id={info.id}
                  specialityId={info.speciality_id}
                  subspecialityId={info.subspeciality_id}
                  treatments={info.treatments}
                />
              </div>
            </div>

            {/* <div className="questions-inner-box1">
              <div className="questions-inner-left">
                <img src="/images/reply.jpg" />
              </div>
              <div className="questions-inner-right">
                <div className="questions-data">
                  <span>Lorem Ipsum</span> Feb 12th 2023 | 5:35 AM
                </div>
                <p>
                  For many, the change in seasons is a good time to do a deep
                  clean in their home, but how many of you have thought to go
                  through your medicine cabinets or storage bins and take
                  inventory of what medication you have in your home? You may be
                  surprised to find that you have expired medication that you
                  had forgotten about or unused medication that isn’t a part of
                  your current medication regimen. So, what do you do with all
                  of that unused and expired medication? forgotten about or
                  unused medication that isn’t a part of your current medication
                  regimen. So, what do you do with
                </p>

                <div className="questions-inner-comments">
                  <a className="comments-iconbox" href="#">
                    <i className="fa fa-heart"></i>23 Helpful
                  </a>
                  <a className="comments-iconbox" href="#">
                    <i className="fa fa-comments"></i>1008 Comments
                  </a>
                  <a className="reply-iconbox" href="#">
                    <span>|</span> Reply
                  </a>
                </div>

                <a className="show-replies-box" href="#">
                  Show Replies
                </a>
              </div>
            </div>

            <div className="questions-inner-box2">
              <div className="questions-inner-left">
                <img src="/images/reply.jpg" />
              </div>
              <div className="questions-inner-right">
                <div className="questions-data">
                  <span>Lorem Ipsum</span> Feb 12th 2023 | 5:35 AM
                </div>
                <p>
                  For many, the change in seasons is a good time to do a deep
                  clean in their home, but how many of you have thought to go
                  through your medicine cabinets or storage bins and take
                  inventory of what medication you have in your home? You may be
                  surprised to find that you have expired medication that you
                  had forgotten about or unused medication that isn’t a part of
                  your current medication regimen. So, what do you do with all
                  of that unused and expired medication? forgotten about or
                  unused medication that isn’t a part of your current medication
                  regimen. So, what do you do with
                </p>

                <div className="questions-inner-comments">
                  <a className="comments-iconbox" href="#">
                    <i className="fa fa-heart"></i>23 Helpful
                  </a>
                  <a className="comments-iconbox" href="#">
                    <i className="fa fa-comments"></i>1008 Comments
                  </a>
                  <a className="reply-iconbox" href="#">
                    <span>|</span> Reply
                  </a>
                </div>

                <a className="show-replies-box" href="#">
                  Hide Replies
                </a>

                <div className="questions-inner-box3">
                  <div className="questions-inner-left">
                    <img src="/images/reply.jpg" />
                  </div>
                  <div className="questions-inner-right">
                    <div className="questions-data">
                      <span>Lorem Ipsum</span> Feb 12th 2023 | 5:35 AM
                    </div>
                    <p>
                      For many, the change in seasons is a good time to do a
                      deep clean in their home, but how many of you have thought
                      to go through your medicine cabinets or storage bins and
                      take inventory of what medication you have in your home?
                      You may be surprised to find that you have expired
                      medication that you had forgotten about or unused
                      medication that isn’t a part of your current medication
                      regimen. So, what do you do with all of that unused and
                      expired medication? forgotten about or unused medication
                      that isn’t a part of your current medication regimen. So,
                      what do you do with
                    </p>

                    <div className="questions-inner-comments">
                      <a className="comments-iconbox" href="#">
                        <i className="fa fa-heart"></i>23 Helpful
                      </a>
                      <a className="comments-iconbox" href="#">
                        <i className="fa fa-comments"></i>1008 Comments
                      </a>
                      <a className="reply-iconbox" href="#">
                        <span>|</span> Reply
                      </a>
                    </div>
                  </div>
                </div>

                <div className="questions-inner-box3">
                  <div className="questions-inner-left">
                    <img src="images/2023/07/man.png" />
                  </div>
                  <div className="questions-inner-right">
                    <div className="questions-data">
                      <span>Lorem Ipsum</span> Feb 12th 2023 | 5:35 AM
                    </div>
                    <p>
                      For many, the change in seasons is a good time to do a
                      deep clean in their home, but how many of you have thought
                      to go through your medicine cabinets or storage bins and
                      take inventory of what medication you have in your home?
                      You may be surprised to find that you have expired
                      medication that you had forgotten about or unused
                      medication that isn’t a part of your current medication
                      regimen. So, what do you do with all of that unused and
                      expired medication? forgotten about or unused medication
                      that isn’t a part of your current medication regimen. So,
                      what do you do with
                    </p>

                    <div className="questions-inner-comments">
                      <a className="comments-iconbox" href="#">
                        <i className="fa fa-heart"></i>23 Helpful
                      </a>
                      <a className="comments-iconbox" href="#">
                        <i className="fa fa-comments"></i>1008 Comments
                      </a>
                      <a className="reply-iconbox" href="#">
                        <span>|</span> Reply
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
