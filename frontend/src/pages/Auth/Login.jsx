import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../authContext/Auth";
import { useLocation, useNavigate } from "react-router-dom";
// import { setTheme } from "colors";

const Login = () => {
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState(0);
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProgress(20);
      const res = await axios.post(
        `${window.location.pathname}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      setProgress(70);
      if (res?.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        setTimeout(() => {
          navigate(location.state || "/");
        }, 1000);
        localStorage.setItem("auth", JSON.stringify(res.data));
        setProgress(100);
        setEmail("");
        setPassword("");
      } else {
        if (res.data.message === "Password is incorrect") {
          toast.error(res.data.message);
          setPassword("");
        } else {
          toast.error(res.data.message);
          setEmail("");
        }
        setProgress(100);
      }
    } catch (error) {
      console.log("error in login jsx", error);
      toast.error("Login error");
      setEmail("");
      setPassword("");
      setProgress(100);
    }
  };
  return (
    <Layout title={"Login Page"} progress={progress}>
      <div className="register">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <p
            className="text-center forgot"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password
          </p>
          <button type="submit" className="btn btn-primary align-item-center ">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
