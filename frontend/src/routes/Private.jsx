import React, { useEffect, useState } from "react";
import { useAuth } from "../authContext/Auth";
import axios from "axios";
import { Outlet, json, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Spinner from "./Spinner";

const Private = () => {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      console.log("useEffect");
      const res = await axios.get(
        "http://localhost:8080/api/v1/auth/user-route",
        {
          headers: {
            Authorization: auth.token,
          },
        }
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

  return <>{ok ? <Outlet /> : <Spinner />}</>;
};

export default Private;
