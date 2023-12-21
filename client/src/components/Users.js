import React, { Fragment, useEffect, useState } from "react";
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Logout } from './Logout'
import { useAuth } from './AuthContext';
import chef from "../images/chef.svg";
import clock from "../images/clock.svg";
import SmallRecipe from "./SmallRecipe.js"

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
      const userId = decodedToken.user;
      const username = decodedToken.nick;

      // cia tai kas aktualu profilio puslapiui
      const [inputsUsername, setInputsUsername] = useState({
        CurrentUsername: "",
        NewUsername: "",
      });
      const [inputsEmail, setInputsEmail] = useState({
        CurrentEmail: "",
        NewEmail: "",
      });
      const [data, setData] = useState([]);

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
          const body = { CurrentUsername, NewUsername, userId };

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
      };

      const updateEmail = async (e) => {
        e.preventDefault();
        try {
          const body = { CurrentEmail, NewEmail, userId };

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
          console.error(err.message);
        }
      };

      useEffect(() => {
        const getRecipes = async () => {
          try {
            const response = await fetch('/auth/recipes', {
              method: 'GET',
              headers: { 
                token: localStorage.token,
                'Content-Type': 'application/json',
              },
            });
      
            const recipe = await response.json();
            const data = recipe.recipeData;
      
            if(data){
              console.log(data);
              setData(data);
            }
          } catch (err) {
            console.error(err.message);
          }
        };
      
        getRecipes();
      }, [userId]);

  return (
    <Fragment>
      <h1>Your Profile, {username}</h1>
      <form onSubmit={updateUsername}>
      <h4>Username</h4>
        <input
          type="text"
          name='CurrentUsername'
          placeholder='Current Username'
          className='form-control my-3'
          value={CurrentUsername}
          onChange={(e) => onChangeUsername(e)}
        />
        <input
          type="text"
          name='NewUsername'
          placeholder='Enter New Username...'
          className='form-control my-3'
          value={NewUsername}
          onChange={(e) => onChangeUsername(e)}
        />
          <button>Update Username</button>
        </form>
        <form onSubmit={updateEmail}>
        <h4>Email</h4>
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
          placeholder='Enter New Email...'
          className='form-control my-3'
          value={NewEmail}
          onChange={(e) => onChangeEmail(e)}
        />
          <button>Update Email</button>
        </form>
        <div>
        <h1>Saved Recipes</h1>
        <div className='recipe'>
        {data.length !== 0 ? (
          <>
            {data.map((recipe, i) => (
              // <div key={recipe.id}>
              //   <div className='extraInfo'>
              //     <img src={clock} alt="clock"/>
              //     <span className='time'>{recipe.time} min</span>
              //     <img src={chef} alt="user" />
              //     <span className='chef'>{recipe.username}</span>
              //   </div>
              // <div className='mainInfo'>
              //   <Link to={`/recipe/${recipe.id}`}>
              //     <img src={'/' + recipe.pictures} alt='Recipe' />
              //   </Link>
              // </div>
              // </div>
              <SmallRecipe key={i} recipe={{id: recipe.id}}/>
            ))}
          </>
        ) : (
          <p>You did not save any recipes yet.</p>
        )}
        </div>
      </div>
    </Fragment>
  );
}

export default Users;