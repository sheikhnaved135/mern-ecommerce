import React from "react";
import Layout from "../components/layouts/Layout";
import { useAuth } from "../authContext/Auth";
import UserMenu from "../components/layouts/UserMenu";

const Profile = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard- Profile"}>
      <div className="container-fluid m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 w-50 p-3">Profile</div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
