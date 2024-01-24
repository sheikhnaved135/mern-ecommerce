import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import React from "react";
import { Helmet } from "react-helmet";
const Layout = ({
  children,
  title,
  description,
  author,
  keywords,
  progress,
}) => {
  return (
    <>
      <div className="container-fluid ">
        <Helmet>
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="author" content={author} />
          <meta name="keywords" content={keywords} />
          <title>{title}</title>
        </Helmet>
        <LoadingBar progress={progress} color="red" />
        <Header />
        <main style={{ minHeight: "74vh" }}>{children}</main>
        <ToastContainer position="top-center" autoClose={1000} />
        <Footer />
      </div>
    </>
  );
};
Layout.defaultProps = {
  title: "Ecommerce 24",
  description: "",
  author: "",
  keywords: "",
};

export default Layout;
