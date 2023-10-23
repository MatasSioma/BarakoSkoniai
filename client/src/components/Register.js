import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
      email: "",
      password: "",
      username: ""
    });

    const { email, password, username } = inputs;

    const onChange = e => {
      setInputs({ ...inputs, [e.target.name]
      : e.target.value });
    };

    const onSubmitForm = async e => {
      e.preventDefault();

      try {
        const body = {email, password, username};

        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" }
          ,
          body: JSON.stringify(body)
        });

        const parseRes = await response.json();

        if(parseRes.token) {
          localStorage.setItem('token', parseRes.token);
          setAuth(true);
          toast.success("Registered Succesfully");
        } else {
          setAuth(false);
          toast.error(parseRes);
        }
      } catch (err) {
        console.error(err.message)
      }
    }

    return (
        <Fragment>
            <h1 className='text-center my-5'>Register</h1>
            <form onSubmit={onSubmitForm}>
              <input
              type="email"
              name="email"
              placeholder='email'
              className='form-control my-3'
              value={email}
              onChange={e => onChange(e)}
              />
              <input
              type="password"
              name="password"
              placeholder='password'
              className='form-control my-3'
              value={password}
              onChange={e => onChange(e)}
              />
              <input
              type="text"
              name="username"
              placeholder='username'
              className='form-control my-3'
              value={username}
              onChange={e => onChange(e)}
              />
              <button className='btn btn-success btn-block'>
              submit
              </button>
            </form>
            <Link to='/login'>Login</Link>
        </Fragment>
    );
};

export default Register;