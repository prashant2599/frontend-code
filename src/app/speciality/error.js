"use client";

import "./error.css";
import Link from "next/link";

const error = () => {
  return (
    <div>
      <section class="page_404">
        <div class="container">
          <div class="wrapper">{/* <h1 class="text-center ">404</h1> */}</div>

          <div class="msg">
            <h3>Oops! Something Went Wrong</h3>
            <p>
              Apologies, something went wrong. The page you sought isn&apos;t
              here or an error occurred. We&apos;re here to assist you.
            </p>

            <div class="backbtn">
              <Link href="/" class="btn">
                <i class="fas fa-arrow-left"></i>
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
