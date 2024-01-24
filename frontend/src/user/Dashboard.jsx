import React from "react";
import Layout from "../components/layouts/Layout";
import { useAuth } from "../authContext/Auth";
import UserMenu from "../components/layouts/UserMenu";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout value={"Dashboard page"}>
      <div className="container-fluid m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 w-50 p-3">
            <h3>Name :{auth?.user?.username}</h3>
            <h3>Email :{auth?.user?.email}</h3>
            <h3>Phone :{auth?.user?.phone}</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
