import React from "react";
import Layout from "../components/layouts/Layout";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Layout title={"Page Not Found"}>
      <div className="container-fluid">
        <div className="pnf">
          <h1>OOPS PAGE NOT FOUND</h1>
          <button onClick={() => navigate("/")} className="btn btn-success">
            GO BACK
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;
