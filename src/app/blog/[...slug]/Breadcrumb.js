import "./breadcrumb.css";
import Link from "next/link";
import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { TbShare2 } from "react-icons/tb";

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
            <div style={{ marginLeft: "auto" }} className="blog-share-mobile">
              <div  className="blog-share" >
                <p className="blog-share-text">Share </p> <TbShare2 style={{fontSize:"25px", color:"#ff6800"}} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Breadcrumb;
