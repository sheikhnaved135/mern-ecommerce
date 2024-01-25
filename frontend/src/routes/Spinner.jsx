import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(5);
  const [progress, setProgress] = useState(25);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setTimeout(() => {
      setCount((prev) => prev - 1);
      setProgress((prev) => prev + count * 5);
    }, 500);
    if (count == 0) {
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }
    console.log(location.pathname);
    return () => clearInterval(interval);
  }, [count, progress, path]);

  return (
    <div className="register">
      <LoadingBar progress={progress} />
      <h1>Unauthorised Access</h1>
      <h1>Redirecting in {count} seconds</h1>
    </div>
  );
};

export default Spinner;
