import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [progress, setProgress] = useState(0);
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProgress(20);
      const res = await axios.post(
        `${window.location.pathname}/api/v1/auth/register`,
        {
          username,
          email,
          password,
          phone,
          address,
          question,
        }
      );
      console.log(res);
      setProgress(70);
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAddress("");
      setProgress(100);
    } catch (error) {
      console.log("register error", error);
      toast.error("Something went wrong while registering");
      setProgress(100);
    }
  };
  return (
    <>
      <Layout title={"Regsiter Page"} progress={progress}>
        <div className="register">
          <h1>Register Page</h1>
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setName(e.target.value)}
                placeholder="enter username"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="enter email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="enter password"
                class="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Phone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                class="form-control"
                placeholder="enter phone number"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Question
              </label>
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type="text"
                class="form-control"
                placeholder="Enter answer"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Address
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="enter address"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;
