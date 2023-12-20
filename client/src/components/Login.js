import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import "./LoginStyles.css"

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        await new Promise((resolve) => {
          localStorage.setItem('token', parseRes.token);
          login(); // Set authentication status to true
          resolve();
        });
        navigate('/'); // Redirect to the dashboard after successful login
        toast.success('Logged in Successfully');
      }
      else{
        toast.error(parseRes.errorMessage);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className='text-center my-5'>Hi, Welcome Back! 👋 </h1>
      <form className='loginForm' onSubmit={onSubmitForm}>
        <input
          type="email"
          name='email'
          placeholder='Enter your Email'
          className='form-control my-3'
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type='password'
          name='password'
          placeholder='Enter your Password'
          className='form-control my-3'
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button className='btn btn-success btn-block'>
          Sign in
        </button>
      </form>
      <div className="reg-redirect">
        <span className='link-container'>
          <Link to='/register'>Don't have an account? Sign up</Link>
        </span>
      </div>
    </Fragment>
  );
};

export default Login;
