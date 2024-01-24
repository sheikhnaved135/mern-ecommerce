import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({ title, price, id, description, slug, addTocart }) => {
  return (
    <div
      className="card m-3 d-flex align-items-center"
      style={{ width: "20rem", cursor: "no-drop" }}
    >
      <img
        style={{ height: "250px", width: "200px" }}
        src={`https://ecommerce24.onrender.com/api/v1/product/get-photo/${id}`}
        className="card-img-top"
        alt="product image"
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h5>₹{price}</h5>
        <p className="card-text">{description}</p>
        <button className="btn btn-primary ms-3 mb-3" onClick={addTocart}>
          Add to Cart
        </button>
        <button className="btn btn-primary ms-3  mb-3">More Info</button>
      </div>
    </div>
  );
};

export default HomeCard;
