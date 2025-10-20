import React, { useRef } from "react";
import "./LogIn.css";
import { checkTheUser } from "../../src/services/SignUp";
import { useNavigate } from "react-router-dom";
const LogIn = () => {
  const navigate = useNavigate();
  const userNameRef = useRef("");
  const passwordRef = useRef("");
  const fetchUser = async (e) => {
    e.preventDefault();
    const userDetail = await checkTheUser(
      userNameRef.current.value,
      passwordRef.current.value
    );
    if (!userDetail) {
      alert("user not found");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="login-page-container">
      <div className="logIn-container">
        <form className="login-form" onSubmit={fetchUser}>
          <input type="text" placeholder="Username" ref={userNameRef} />
          <input type="password" placeholder="Password" ref={passwordRef} />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
