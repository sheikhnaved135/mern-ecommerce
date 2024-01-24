import React from "react";
import Layout from "../components/layouts/Layout";
import AdminMenu from "../components/layouts/AdminMenu";

const User = () => {
  return (
    <Layout title={"Dashboard- All Users"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">Users</div>
      </div>
    </Layout>
  );
};

export default User;
