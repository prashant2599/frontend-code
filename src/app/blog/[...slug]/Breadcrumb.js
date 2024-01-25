import "./breadcrumb.css";
import Link from "next/link";
import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import ShareBlog from "./ShareBlog";

const Breadcrumb = ({ heading, slug }) => {
  return (
    <>
      <section className="mf-breadcrumb">
        <div className="midbox-inner  wiki-mk">
          <div style={{ display: "flex" }}>
            <div>
              <ul>
                <li>
                  <Link href="/">Home </Link>{" "}
                  <i className="fa fa-chevron-right">
                    <FaAngleRight
                      style={{ top: "-3px", position: "relative" }}
                    />
                  </i>
                </li>
                <li>
                  {" "}
                  <Link href="/blogs">Blogs</Link>{" "}
                  <i className="fa fa-chevron-right">
                    <FaAngleRight
                      style={{ top: "-3px", position: "relative" }}
                    />
                  </i>
                </li>
                <li>{heading}</li>
              </ul>
            </div>
            <ShareBlog slug={slug} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Breadcrumb;
