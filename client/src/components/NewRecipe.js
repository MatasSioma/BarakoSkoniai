import React, { useEffect } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Logout } from './Logout'
import { useAuth } from './AuthContext';

function retFalse() {
  return false;
}

function NewRecipe() {
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
  return (
    <div className='newRecipe'>
      <form method="post" action="http://localhost:3001/api/new" encType="multipart/form-data" onSubmit={retFalse}>
        <input type="text" placeholder="Title" name="title" required/>
        <input type="number" placeholder="Preparation time in minutes" name="time" step={1} min={0} />
        <input type="text" placeholder="Cucumber, Tomato, ..." name="ingredients" required/>
        <input type="text" placeholder="Oven, Frying pan, ..." name="equipment" />
        <p>If the name of Ingredients and Equipment isn't found in the table of I&E, check the console to specify other info like Group name</p>
        <p>Note: these names will be translated to ids and put into an array in the DB. Only requirement - split the ingrdients and equipment with ','</p>
        <input type="text" placeholder="Description" name="description" />
        <p>Images: </p>
        <input type="file" accept='image/*' name="images" multiple/>
        <textarea
          name="steps"
          cols="30"
          rows="10"
          placeholder="Steps to the recipe formatted as <step 1 text>; <step 2 text>; ... - seperated by '; '"
        ></textarea>
        <input type="submit" value="Add Recipe"/>
      </form>
    </div>
  );
}

export default NewRecipe;
