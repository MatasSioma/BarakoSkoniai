import React, { Fragment, useEffect } from "react";
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Logout } from './Logout'
import { useAuth } from './AuthContext';

import SmallRecipe from "./SmallRecipe";

function Home() {
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
        <Fragment>
            <div id="homePage">
                <h1>Home page</h1>
                {/* 21 arba 9 */}
                <SmallRecipe recipe={{id: "21"}} loadUserIngredients={true}/>
            </div>
        </Fragment>
    );
}

export default Home;
