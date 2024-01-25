import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-dark text-white p-3">
        {" "}
        <h3 className="text-center">All right reserved &copy;</h3>
        <p className="text-center">
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/policy"}>Policy</Link>
        </p>
      </div>
    </>
  );
};
export default Footer;
