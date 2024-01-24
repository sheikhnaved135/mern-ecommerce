import React, { useState, useEffect } from "react";
import Layout from "../components/layouts/Layout";
import AdminMenu from "../components/layouts/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "./CategoryForm";
import { Button, Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [id, setId] = useState();
  const [update, setUpdateName] = useState("");
  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `${window.location.pathname}/api/v1/category/get-category`
      );
      setProgress(70);
      if (data.success) {
        setCategories(data.category);
      } else {
        toast.error(data.message);
      }
      setProgress(100);
    } catch (error) {
      console.log(error);
      toast.error("Someting went wrong in getting category");
      setProgress(100);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProgress(0);
      const res = await axios.post(
        `${window.location.pathname}/api/v1/category/create-category`,
        { name }
      );
      console.log(progress);
      setProgress(70);
      if (res.data.success) {
        toast.success(res.data.message);
        getCategory();
        setName("");
      } else {
        toast.error(res.data.message);
      }
      setProgress(100);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in creating category");
      setProgress(100);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  const handleOk = async () => {
    setProgress(10);
    await axios.delete(
      `${window.location.pathname}/api/v1/category/delete-category/${id}`
    );
    setProgress(70);
    toast.success("Category deleted");
    setIsModelOpen(false);
    setProgress(100);
    getCategory();
  };
  const handleCancel = () => {
    setIsModelOpen(false);
    setModelOpen(false);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setProgress(10);
      const res = await axios.put(
        `${window.location.pathname}/api/v1/category/update-category/${id}`,
        { name: update }
      );
      setProgress(70);
      if (res.data.success) {
        toast.success(res.data.message);
        getCategory();
        setUpdateName(update);
        setTimeout(() => {
          handleCancel();
        }, 500);
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
    <Layout title={"Dashboard- Create Category"} progress={progress}>
      <Modal
        title="delete category"
        open={isModelOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Are you sure, you want to delete
      </Modal>

      <Modal open={modelOpen} onOk={handleUpdate} onCancel={handleCancel}>
        <CategoryForm
          name={update}
          setName={setUpdateName}
          handleSubmit={handleUpdate}
        />
      </Modal>

      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />
          <table className="table">
            <thead>
              <tr>
                <th className="text-center" scope="col">
                  Category
                </th>
                <th className="text-center" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>
                    <Button
                      className="btn btn-primary"
                      onClick={() => {
                        setModelOpen(true);
                        setId(item._id);
                        setUpdateName(item.name);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      className="btn btn-danger"
                      type="primary"
                      onClick={() => {
                        setIsModelOpen(true);
                        setId(item._id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
