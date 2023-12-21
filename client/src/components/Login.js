import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import "./LoginStyles.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        await new Promise((resolve) => {
          localStorage.setItem("token", parseRes.token);
          login(); // Set authentication status to true
          resolve();
        });
        navigate("/"); // Redirect to the dashboard after successful login
        toast.success("Logged in Successfully");
      } else {
        toast.error(parseRes.errorMessage);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="main-login-text text-center my-5">
        Hi, Welcome Back! 👋{" "}
      </h1>
      <h5 className="sub-text-login">Email</h5>
      <form className="loginForm" onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          className="form-control mb-3"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <h5 className="sub-text-login">Password</h5>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Sign in</button>
      </form>
      <div className="reg-redirect">
        <span className="link-container">
          <Link to="/register">
            <span className="black">Don't have an account?&nbsp;</span>
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
