import React, { useEffect, useState } from "react";
import AdminMenu from "../components/layouts/AdminMenu";
import Layout from "../components/layouts/Layout";
import { toast } from "react-toastify";
import Card from "../components/Card";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Products = () => {
  const [products, setProduct] = useState([]);
  const [progress, setProgress] = useState(0);
  const [photos, setPhotos] = useState("");
  const navigate = useNavigate();
  const getProduct = async (id) => {
    try {
      const res = await axios.get(
        `${window.location.pathname}/api/v1/product/get-product`
      );
      setProgress(70);
      if (res?.data?.success) {
        setProduct(res.data.product);
        console.log(products);
      } else {
        toast.error(res.data.message);
      }
      setProgress(100);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
      setProgress(100);
    }
  };
  useEffect(() => {
    console.log("get product useeffect");
    getProduct();
  }, []);

  const handleDelete = async (id, e) => {
    try {
      setProgress(0);
      const res = await axios.delete(
        `${window.location.pathname}/api/v1/product/delete-product/${id}`
      );
      setProgress(70);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(res.data.message);
      }
      setProgress(100);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
      setProgress(100);
    }
  };

  return (
    <Layout title={"Best Offers"}>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">
            <AdminMenu />
          </div>
          <div className="w-100"></div>
          {products.map((item) => (
            <div className="col-lg-3 col-md-6 d-flex justify-content-center align-items-center">
              <Card
                title={item.name.substr(1, 20).toUpperCase()}
                description={item.description.substr(1, 100)}
                price={item.price}
                id={item._id}
                slug={item.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
