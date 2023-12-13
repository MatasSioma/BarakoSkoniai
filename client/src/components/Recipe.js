import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Logout } from './Logout'
import { useAuth } from './AuthContext';

import chef from "../images/chef.svg"
import clock from "../images/clock.svg"

import "./RecipeStyles.css"

function Recipe() {
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
      
    let { id } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/recipeFull/${id}`);
            if (!response.ok) throw new Error("Netwrok is nekazka bro");
                const data = await response.json();
                console.log(data);
                setData(data);
            } catch (error) {
                // console.log(error);
                console.log("failed... Make sure server running (npm start in when in server directory)");
            }
        }
        fetchData();
    }, [id])

    const stars = (rating) => {
      rating = parseFloat(rating);
      rating = Math.round(rating * 100) / 100;
      let values = [0,0,0,0,0];
    
      let i = 0;
      while(true) {
        if(rating - 1 > 0) {
          values[i] = 1;
          rating -= 1;
        } else {
          values[i] = rating;
          break;
        }
        i++;
      }
    
      return (
        values.map((value, i) => {
            const color = {1: "rgb(255,228,56)", 0: "rgb(230,230,230)"}; // 1 - yellow, 0 - grey
            if (value === 1 || value === 0) {
                return (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
                    <path fill={color[value]} d="M96.9,41.4l-22.2,21l5.6,30.3c0.1,0.9-0.2,1.7-0.9,2.2c-0.4,0.3-0.9,0.4-1.3,0.4s-0.8,0-1.1-0.2L50,80.4L23,95.1
                    c-0.7,0.4-1.6,0.3-2.3-0.1c-0.6-0.5-1-1.3-0.9-2.2l5.6-30.3L3.1,41.3c-0.5-0.5-0.7-1.4-0.5-2.2s0.9-1.3,1.7-1.4l30.6-4L48.1,5.8
                    C48.4,5,49.2,4.6,50,4.6s1.6,0.4,1.9,1.2l13.2,27.9l30.6,4c0.8,0.1,1.5,0.7,1.7,1.4C97.6,40,97.4,40.8,96.9,41.4z"/>
                </svg>
                )
            } else {
                return (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
                    <defs>
                    <linearGradient id={`grad${value}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={color[1]} stopOpacity="1" />
                        <stop offset={`${value*100}%`} stopColor={color[1]} stopOpacity="1" />
                        <stop offset={`${value*100 + 0.01}%`} stopColor={color[0]} stopOpacity="1" />
                        <stop offset="100%" stopColor={color[0]} stopOpacity="1" />
                    </linearGradient>
                    </defs>
                    <path fill={`url(#grad${value})`} d="M96.9,41.4l-22.2,21l5.6,30.3c0.1,0.9-0.2,1.7-0.9,2.2c-0.4,0.3-0.9,0.4-1.3,0.4s-0.8,0-1.1-0.2L50,80.4L23,95.1
                    c-0.7,0.4-1.6,0.3-2.3-0.1c-0.6-0.5-1-1.3-0.9-2.2l5.6-30.3L3.1,41.3c-0.5-0.5-0.7-1.4-0.5-2.2s0.9-1.3,1.7-1.4l30.6-4L48.1,5.8
                    C48.4,5,49.2,4.6,50,4.6s1.6,0.4,1.9,1.2l13.2,27.9l30.6,4c0.8,0.1,1.5,0.7,1.7,1.4C97.6,40,97.4,40.8,96.9,41.4z"/>
                </svg>
                )
            }
        })
      )
    }

    const renderSteps = () => {
        return data.steps.map((step, i) => {
            return (<li key={i}>{step}</li>)
        })
        // console.log(steps);
        // return <p>{JSON.stringify(steps)}</p>
    }
    
    return (
        <div className='recipe'>
            { data.length !== 0 ? (
            <>
            <div className='name'>
                <h1>{data.title}</h1>
                <div className='rating'>
                    {stars(data.rating)}
                    <span>({data.rating_amount})</span>
                </div>
            </div>
            <div className='extraInfo'>
                <img src={clock} alt="clock"/>
                <span className='time'>{data.time} min</span>
                <img src={chef} alt="user" />
                <span className='chef'>{data.username}</span>
            </div>
            <div className='mainInfo'>
                <img src={ "/" + data.pictures} alt="Recipe" />
                
            </div>
            <div className='steps'>
                <h3>Recipe:</h3>
                <ol>{renderSteps()}</ol>
            </div>
            </>
            ):(
                <p>Loading recipe...</p>
            )}
        </div>
    )
}

export default Recipe;