import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useCart } from "../../authContext/Cart";
import { useAuth } from "../../authContext/Auth";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [totalPrice, setToatalPrice] = useState(0);
  const removeFromCart = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      toast.success("Item removed");
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    let total = 0;
    cart.map((item) => (total = total + Number(item.price)));
    setToatalPrice(total);
    console.log(totalPrice);
  }, [cart, setCart]);
  return (
    <Layout title={"CartPage"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">{`Hello ${
              auth?.user?.username ? auth?.user?.username : "Guest"
            }`}</h1>
            <h3 className="text-center">
              {cart?.length > 0
                ? `Your cart has ${cart?.length} items \n ${
                    auth?.token ? "" : " Please login to checkout"
                  }`
                : "Your cart is empty"}
            </h3>
          </div>
          <div className="col-md-12 d-flex flex-wrap justify-content-center">
            {cart?.map((item) => (
              <div
                className="card m-3 d-flex justify-content-center align-items-center"
                style={{ width: "20rem", cursor: "no-drop" }}
              >
                <img
                  style={{ height: "250px", width: "200px" }}
                  src={`http://localhost:8080/api/v1/product/get-photo/${item._id}`}
                  className="card-img-top"
                  alt="product image"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{item.title}</h5>
                  <h5>₹{item.price}</h5>
                  <p className="card-text">{item.description.substr(0, 30)}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-100"></div>
          {cart?.length > 0 ? (
            <div className="col-md-12 text-center h1 mb-3">{`Your total ₹${totalPrice}/-`}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
