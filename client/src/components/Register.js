import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./RegisterStyles.css";

const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, username };

        const response = await fetch("/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" }
          ,
          body: JSON.stringify(body)
        });

      const parseRes = await response.json();

      if (parseRes.message) {
        toast.success(parseRes.message);
        navigate("/Login");
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="main-reg-text text-center">Create an account</h1>
      <h1 className="subText">Explore the possibilities today!</h1>
      <h5 className="sub-text-login">Email</h5>
      <form onSubmit={onSubmitForm}>
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
        <h5 className="sub-text-login">Username</h5>
        <input
          type="text"
          name="username"
          placeholder="Enter Your Username"
          className="form-control mb-3"
          value={username}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Sign Up</button>
      </form>
      <Link to="/login" className="login-link">
        Already have an account?
      </Link>
    </div>
  );
};

export default Register;
