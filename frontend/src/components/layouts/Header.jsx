import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { useAuth } from "../../authContext/Auth";
import { toast } from "react-toastify";
import { useCart } from "../../authContext/Cart";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to={"/"}>
              <MdShoppingCart />
              Ecommerce 24
            </Link>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={"/"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown-item">
                <NavLink className="nav-link" to={"/category"}>
                  Category
                </NavLink>
              </li>
              {auth.user ? (
                <>
                  {" "}
                  <li className="nav-item dropdown ">
                    <NavLink
                      className="nav-link dropdown-toggle "
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ borderBottom: "none" }}
                    >
                      {auth.user.username}
                    </NavLink>
                    <ul className="dropdown-menu ">
                      <li className="nav-item dropdown-item">
                        <NavLink
                          className="nav-link"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="nav-item dropdown-item ">
                        <NavLink
                          className="nav-link"
                          onClick={() => {
                            setAuth({
                              ...auth,
                              user: null,
                              token: "",
                            });
                            localStorage.removeItem("auth");
                            toast.success("Logged out successfully");
                          }}
                          to={"/login"}
                        >
                          logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/login"}>
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/register"}>
                      Register
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item ">
                <NavLink className="nav-link " to={"/cart"}>
                  {`Cart${cart?.length}`}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
