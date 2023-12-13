import React, { Fragment, useEffect, useState } from "react";
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Logout } from './Logout'
import { useAuth } from './AuthContext';

function Users () {
  const navigate = useNavigate();
  const { logout } = useAuth();

    const checkTokenExpiration = () => {
        const token = localStorage.getItem('token');

    
        if (token) {
          const decodedToken = jwt_decode(token);
          const currentTime = Date.now() / 1000;
    
          if (decodedToken.exp < currentTime) {
            // Token has expired
            Logout(navigate, toast);
            logout();
          }
        }
      };
    
      useEffect(() => {
        checkTokenExpiration();
        // Set up an interval to check token expiration every minute
        const intervalId = setInterval(checkTokenExpiration, 60000);
        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
      },);

      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      //const userId = decodedToken.user;
      const username = decodedToken.nick;

      // cia tai kas aktualu profilio puslapiui
      const [inputsUsername, setInputsUsername] = useState({
        CurrentUsername: "",
        NewUsername: "",
      });
      const [inputsEmail, setInputsEmail] = useState({
        CurrentEmail: "",
        NewEmail: "",
      })

      const {CurrentUsername, NewUsername} = inputsUsername;
      const {CurrentEmail, NewEmail} = inputsEmail; 
      const onChangeUsername = (e) => {
        setInputsUsername({ ...inputsUsername, [e.target.name]: e.target.value })
      };
      const onChangeEmail = (e) => {
        setInputsEmail({ ...inputsEmail, [e.target.name]: e.target.value })
      };

      const updateUsername = async (e) => {
        e.preventDefault();
        try {
          const body = { CurrentUsername, NewUsername };

          const response = await fetch('http://localhost:3001/auth/updateUsername', {
            method: 'POST',
            headers: { 
              token: localStorage.token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });

          let parseRes = await response.json();

          if(parseRes.token){
            localStorage.removeItem('token');
            localStorage.setItem('token', parseRes.token);
            navigate('/Users');
            toast.success("Username Update Successfully");
          }
          else{
            toast.error(parseRes.errorMessage);
          }
        } catch (err) {
          console.log(err.message);
        }
      }

      const updateEmail = async (e) => {
        e.preventDefault();
        try {
          const body = { CurrentEmail, NewEmail };

          const response = await fetch('http://localhost:3001/auth/updateEmail', {
            method: 'POST',
            headers: { 
              token: localStorage.token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });
          let parseRes = await response.json();
          if(parseRes.message){
            navigate('/Users');
            toast.success(parseRes.message);
          } 
          else{
            toast.error(parseRes.errorMessage);
          }
        } catch (err) {
          console.error(err.meesage);
        }
      }

  return (
    <Fragment>
      <h1>Your Profile, {username}</h1>
      <form onSubmit={updateUsername}>
      <h4>Current Username</h4>
        <input
          type="text"
          name='CurrentUsername'
          placeholder='CurrentUsername'
          className='form-control my-3'
          value={CurrentUsername}
          onChange={(e) => onChangeUsername(e)}
        />
        <input
          type="text"
          name='NewUsername'
          placeholder='New Username'
          className='form-control my-3'
          value={NewUsername}
          onChange={(e) => onChangeUsername(e)}
        />
          <button>Update Username</button>
        </form>
        <form onSubmit={updateEmail}>
        <h4>Current Email</h4>
        <input
          type="email"
          name='CurrentEmail'
          placeholder='Current Email'
          className='form-control my-3'
          value={CurrentEmail}
          onChange={(e) => onChangeEmail(e)}
        />
        <input
          type="email"
          name='NewEmail'
          placeholder='New Email'
          className='form-control my-3'
          value={NewEmail}
          onChange={(e) => onChangeEmail(e)}
        />
          <button>Update Email</button>
        </form>
    </Fragment>
  );
}

export default Users;