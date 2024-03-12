"use client";

import "./error.css";
import Link from "next/link";

const error = () => {
  return (
    <div>
      <section className="page_404">
        <div className="container">
          <div className="wrapper">
            {/* <h1 className="text-center ">404</h1> */}
          </div>

          <div className="msg">
            <h3>Oops! Something Went Wrong</h3>
            <p>
              Apologies, something went wrong. The page you sought isn&apos;t
              here or an error occurred. We&apos;re here to assist you.
            </p>

            <div className="backbtn">
              <Link href="/" className="btn">
                <i className="fas fa-arrow-left"></i>
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default error;
