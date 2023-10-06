import React from "react";
import Nav from "./Nav";
import "./Head.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../services/Redux/userSlice";
function Header() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  return (
    <>
      <header className="header">
        <div className="search">
          <input
            type="text"
            placeholder="Search"
          />
        </div>
        <Link
          to="/"
          className="logo">
          <img src="../src/image/logo.png" />
          <h2> Cake • bake </h2>
        </Link>
        <div className="login_nav">
          {user ? (
            <div className="login_box">
              <h4>Hello {user.displayName}</h4>{" "}
              <button onClick={() => dispatch(logoutUser())}>Log out</button>
            </div>
          ) : (
            <Link to="/login">
              <img src="../src/image/next.png" />
              <h3>Login</h3>
            </Link>
          )}
        </div>
        <div className="cart">
          <Link to="/cart">
            {" "}
            <img src="../src/image/shopping-bag.png" /> <h3>Cart {cart.length} </h3>
          </Link>
        </div>
      </header>
      <Nav />
    </>
  );
}

export default Header;
