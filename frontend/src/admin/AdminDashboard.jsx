import React from "react";
import { useAuth } from "../authContext/Auth";
import AdminMenu from "../components/layouts/AdminMenu";
import Layout from "../components/layouts/Layout";

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-50 p-3">
              <h3>Name: {auth?.user?.username}</h3>
              <h3>Email: {auth?.user?.email}</h3>
              <h3>Phone: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
