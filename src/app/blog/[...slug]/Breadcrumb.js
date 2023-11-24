import "./breadcrumb.css";
import Link from "next/link";
import React from "react";

const Breadcrumb = ({ heading, slug }) => {
  return (
    <div className="breadcrumb">
      <Link href="/" style={{ color: "black" }}>
        <span>Home</span>
      </Link>
      <span className="separator">{">"}</span>

      <Link href="/blogs" style={{ color: "black" }}>
        <span>Blogs</span>
      </Link>

      <span className="separator">{">"}</span>
      <Link href={`/blog/${slug}`}>
        <span style={{ color: "#ff6800" }}>{heading}</span>
      </Link>
    </div>
  );
};

export default Breadcrumb;
