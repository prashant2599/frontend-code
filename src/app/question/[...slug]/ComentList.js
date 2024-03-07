import React from "react";
import { FaComments } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const ComentList = async ({ questionId }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reply_list/${questionId}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  const list = data.comments.comments;

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  }
  return (
    <>
      {list.map((e) => (
        <div className="questions-inner-box1" key={e.id}>
          <div className="questions-inner-left">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/icon.jpg`}
              alt="user-profile"
            />
          </div>
          <div className="questions-inner-right">
            <div className="questions-data">
              <span></span> {formatDate(e.created_at)}
            </div>
            <p>{e.long_description}</p>

            <div className="questions-inner-comments">
              <a className="comments-iconbox" href="#">
                <i>
                  <FaHeart style={{ fontSize: "20px" }} />
                </i>{" "}
                Helpful
              </a>
              <a className="comments-iconbox" href="#">
                <i>
                  <FaComments style={{ fontSize: "20px" }} />
                </i>{" "}
                Comments
              </a>
              <a className="reply-iconbox" href="#">
                <span>|</span> Reply
              </a>
            </div>

            {/* <a className="show-replies-box" href="#">
              Show Replies
            </a> */}
          </div>
        </div>
      ))}

      {/* <div className="questions-inner-box2">
        <div className="questions-inner-left">
          <img src="/images/reply.jpg" />
        </div>
        <div className="questions-inner-right">
          <div className="questions-data">
            <span>Lorem Ipsum</span> Feb 12th 2023 | 5:35 AM
          </div>
          <p>
            For many, the change in seasons is a good time to do a deep clean in
            their home, but how many of you have thought to go through your
            medicine cabinets or storage bins and take inventory of what
            medication you have in your home? You may be surprised to find that
           
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
                For many, the change in seasons is a good time to do a deep
                clean in their home, but how many of you have thought to go
                through your medicine cabinets or storage bins and take
                inventory of what medication you have in your home? You may be
                surprised to find that you have expired medication that you had
                forgotten about or unused medication that isn’t a part of your
                current medication regimen. So, what do you do with all of that
                unused and expired medication? forgotten about or unused
                medication that isn’t a part of your current medication regimen.
                So, what do you do with
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
                For many, the change in seasons is a good time to do a deep
                clean in their home, but how many of you have thought to go
                through your medicine cabinets or storage bins and take
                inventory of what medication you have in your home? You may be
                surprised to find that you have expired
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
    </>
  );
};

export default ComentList;
