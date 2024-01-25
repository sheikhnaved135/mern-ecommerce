import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import { Modal, Select } from "antd";
import AdminMenu from "../components/layouts/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;
const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
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
  const [id, setId] = useState("");
  const [bshipping, setbShipping] = useState();
  const [product, setProduct] = useState([]);

  const [isModelOpen, setIsModelOpen] = useState(false);
  //get all category
  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        `${window.location.pathname}/v1/category/get-category`
      );
      if (res.data.success) {
        setCategories(res.data.category);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in the get all category");
    }
  };

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `${window.location.pathname}/v1/product/get-product/${params.slug}`
      );
      setProduct(res?.data.product);
      setId(res?.data.product._id);
      setName(res?.data.product.name);
      setDescription(res?.data.product.description);
      setPrice(res?.data.product.price);
      setQuantity(res?.data.product.quantity);
      setCategory(res?.data.product.category._id);
      console.log("category", category);
      setbShipping(res?.data.product.shipping);
      if (res?.data.product.shipping) {
        setShipping("Yes");
      } else {
        setShipping("No");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in get single product");
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    setProgress(20);
    try {
      setProgress(0);
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("shipping", bshipping);
      productData.append("category", category);
      const { data } = await axios.post(
        `${window.location.pathname}/v1/product/update-product/${id}`,
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
      toast.error("Something went wrong in updating product");
    }
  };
  const deleteHandle = async (e) => {
    e.preventDefault();
    setProgress(20);
    setIsModelOpen(false);
    try {
      const res = await axios.delete(
        `${window.location.pathname}/v1/product/delete-product/${id}`
      );
      setProgress(70);
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
      setProgress(100);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in delete handle");
      setProgress(100);
    }
  };
  useEffect(() => {
    getAllCategory();
    getSingleProduct();
  }, []);
  return (
    <Layout title={"Update Product"} progress={progress}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Update Product</h1>
          <div className="w-100 text-center">
            <button
              className="btn btn-success mb-3"
              onClick={() => {
                navigate("/dashboard/admin/products");
              }}
            >
              Back to Products
            </button>
          </div>

          <div className="mb-3">
            <Select
              size="large"
              placeholder={"category"}
              className="form-select"
              variant="false"
              value={category}
            >
              {categories.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
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
            {photo ? (
              <img
                className="img img-responsive"
                src={URL.createObjectURL(photo)}
                alt=""
                height={"200px"}
              />
            ) : (
              <img
                className="img img-responsive"
                src={`${window.location.pathname}/v1/product/get-photo/${id}`}
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
              value={shipping}
              onChange={(value) => {
                setShipping(value);
              }}
              placeholder="shipping"
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>
          <div className="mb-3">
            <button className="btn btn-primary w-100  " onClick={updateProduct}>
              Update Product
            </button>{" "}
            <button
              className="btn btn-danger w-100 mt-3"
              onClick={() => {
                setIsModelOpen(true);
              }}
            >
              Delete
            </button>
            <Modal
              title={`Delete ${params.slug}`}
              open={isModelOpen}
              onOk={deleteHandle}
              onCancel={() => setIsModelOpen(false)}
            >
              Are you sure, you want to delete
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
