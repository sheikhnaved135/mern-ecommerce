import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import AdminMenu from "../components/layouts/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");

  //product
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        `${window.location.pathname}/api/v1/category/get-category`
      );
      if (res.data.success) {
        setCategories(res.data.category);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //create product
  const handleProduct = async (e) => {
    e.preventDefault();
    setProgress(0);
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("shipping", shipping);
      productData.append("category", category);
      const { data } = await axios.post(
        `${window.location.pathname}/api/v1/product/create-product`,
        productData
      );
      setProgress(70);
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 1000);
      } else {
        toast.error(data.message);
      }
      setProgress(100);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating product");
      setProgress(100);
    }
  };
  return (
    <Layout title={"Dashboard- Create Product"} progress={progress}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="m-3">
            <Select
              placeholder="Select Category"
              size="large"
              className="form-select mb-3"
              variant={false}
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
            <div>
              <label className="btn btn-outline-secondary w-100 ">
                {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  hidden
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
            </div>
            <div className="text-center mb-3 mt-3">
              {photo && (
                <img
                  className="img img-responsive"
                  src={URL.createObjectURL(photo)}
                  alt=""
                  height={"200px"}
                />
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Write product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                placeholder="Write product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Write product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Write product quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <Select
                bordered={false}
                size="large"
                className="form-select mb-3"
                showSearch
                onChange={(value) => {
                  setShipping(value);
                }}
                placeholder="shipping"
              >
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </div>
            <div className="text-center">
              <button className="btn btn-primary w-100" onClick={handleProduct}>
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
