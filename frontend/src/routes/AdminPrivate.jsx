import React, { useEffect, useState } from "react";
import { useAuth } from "../authContext/Auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
// import LoadingBar from "react-top-loading-bar";
import Spinner from "./Spinner";

const AdminPrivate = () => {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      console.log("useEffect");
      axios.defaults.headers.common["Authorization"] = auth?.token;
      const res = await axios.get(
        "http://localhost:8080/api/v1/auth/admin-route"
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  // for spinner

  return <>{ok ? <Outlet /> : <Spinner path="" />}</>;
};

export default AdminPrivate;
