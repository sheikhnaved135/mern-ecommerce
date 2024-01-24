import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";

import { toast } from "react-toastify";
import axios from "axios";
import HomeCard from "../components/layouts/HomeCard";
import { Checkbox, Radio } from "antd";
import { Prices } from "./Auth/Prices";
import { useCart } from "../authContext/Cart";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [progress, setProgress] = useState(0);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useCart();
  //get product
  const getProducts = async () => {
    setProgress(20);
    try {
      const res = await axios.get(
        `https://ecommerce24.onrender.com/api/v1/product/product-list/${page}`
      );
      setProgress(70);
      setProducts(res?.data.product);
      setProgress(100);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting product");
      setProgress(100);
    }
  };
  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce24.onrender.com/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      } else {
        toast.error(data.message);
      }
      // console.log(categories);
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong in getting category");
      setProgress(100);
    }
  };
  const filterProducts = async () => {
    try {
      setProgress(20);
      const res = await axios.post(
        `https://ecommerce24.onrender.com/api/v1/product/product-filter`,
        { checked, radio }
      );
      setProgress(70);
      if (res?.data.success) {
        setProducts(res.data.product);
      }
      setProgress(100);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in filtering");
      setProgress(100);
    }
  };
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((item) => item !== id);
    }
    setChecked(all);
  };
  const totalProduct = async () => {
    try {
      const res = await axios.get(
        `https://ecommerce24.onrender.com/api/v1/product/total-count`
      );
      setTotal(res.data.totalCount);
      console.log(res.data.totalCount);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProducts();
    }
  }, [checked, radio]);
  //useEffect
  useEffect(() => {
    if (!checked.length || !radio.length) {
      getProducts();
    }
    getCategory();
  }, []);
  useEffect(() => {
    totalProduct();
  }, []);
  const loadMore = async () => {
    try {
      setProgress(10);
      const res = await axios.get(
        `https://ecommerce24.onrender.com/api/v1/product/product-list/${page}`
      );
      setProgress(70);
      setProducts([...products, ...res?.data.product]);
      setProgress(100);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in load more");
      setProgress(100);
    }
  };
  useEffect(() => {
    if (page == 1) return;
    loadMore();
  }, [page]);
  return (
    <Layout title={"Best Offers"} progress={progress}>
      <h1 className="text-center">Home page</h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h4 className="">
              FILTER BY CATEGORY
              <div className="d-flex flex-column">
                {categories.map((item) => (
                  <Checkbox
                    key={item._id}
                    onChange={(e) => handleFilter(e.target.checked, item._id)}
                  >
                    {item.name}
                  </Checkbox>
                ))}
                {/* {JSON.stringify(radio, null, 4)} */}
              </div>
            </h4>
            <div className="d-flex flex-column">
              <h4 className="mt-2">FILTER BY PRICE</h4>
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                <div className="d-flex flex-column">
                  {Prices.map((item) => (
                    <Radio key={item.id} value={item.array}>
                      {item.name}
                    </Radio>
                  ))}
                </div>
              </Radio.Group>
              <button
                className="mt-3 btn btn-secondary"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reset
              </button>
            </div>
          </div>
          {products.map((item) => (
            <div
              className="col-lg-3 col-md-4 d-flex justify-content-center align-items-center"
              key={item._id}
            >
              <HomeCard
                title={item.name.substr(0, 20)}
                description={item.description.substr(0, 100)}
                price={item.price}
                id={item._id}
                addTocart={() => {
                  setCart([...cart, item]);
                  localStorage.setItem("cart", JSON.stringify([...cart, item]));
                  toast.success("Added to cart");
                }}
              />
            </div>
          ))}
          <div className="w-100"></div>
          <div className="col text-center mb-3">
            {products && products.length < total ? (
              <button
                className="btn btn-warning w-15"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                Load more
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
