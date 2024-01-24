import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Card = ({ title, description, price, id, slug }) => {
  const [photo, setPhoto] = useState("");

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/dashboard/admin/products/${slug}`}
    >
      <div
        className="card m-3 d-flex align-items-center"
        style={{ width: "20rem", height: "30rem" }}
      >
        <img
          style={{ height: "250px", width: "200px" }}
          src={`${window.location.pathname}/api/v1/product/get-photo/${id}`}
          className="card-img-top"
          alt="product image"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h5>₹{price}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
