import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode as jwt_decode } from 'jwt-decode'
import { toast } from 'react-toastify';

import chef from "../images/chef.svg"
import clock from "../images/clock.svg"

import "./RecipeStyles.css"

function Recipe() {
    let { id } = useParams();

    let rated = false;
    let userId = null;
    const token = localStorage.getItem("token");
    if (token) {
        const decodedToken = jwt_decode(token);
        userId = decodedToken.user;
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/recipeFull/${id}`);
            if (!response.ok) throw new Error("Netwrok is nekazka bro");
                const data = await response.json();
                console.log(data);
                if(userId && data.ratings[userId]) data.rating = data.ratings[userId];
                setData(data);
            } catch (error) {
                console.log(error);
                console.log("failed... Make sure server running (npm start in when in server directory)");
            }
        }
        fetchData();
    }, [id, userId])

    const stars = (rating) => {
      const color = {1: "rgb(255,228,56)", 0: "rgb(230,230,230)", 2: "rgb(255, 233, 89)"}; // 1 - yellow, 0 - grey, 2 - selected yellow

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
    
      const starHoverIn = (index) => {
        if(!userId) return;
        const stars = document.querySelectorAll(".rating path");
        for(let i = 0; i < 5; i++) stars[i].style.fill = color[0];
        for (let i = 0; i < index + 1; i++) stars[i].style.fill = color[2];
      }

      const starHoverOut = () => {
        if(!userId) return;
        const stars = document.querySelectorAll(".rating path");
        for (let i = 0; i < 5; i++) stars[i].removeAttribute("style");
      }

      const starClick = async (index) => {
        if (userId) {
            console.log(index+1);
            const body = {recipeId: data.id, userId: userId, rating: index+1};
            try {
                let response = await fetch("/api/rate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })
                const parseRes = await response.json();
                if(parseRes.action !== -1) {
                    toast.success(parseRes.message);
                } else {
                    toast.error(parseRes.error);
                }
                setData(prev => {
                    let amount = prev.rating_amount;
                    // console.log(rated, data.ratings[userId])
                    if (rated === false && data.ratings[userId] === undefined) {
                        amount += + 1;
                    }
                    rated = true;
                    return {
                        ...prev,
                        rating: `${index+1}.00`,
                        rating_amount: amount
                    };
                });
            } catch(e) {
                console.error(e);
            }
        }
      }

      return (
        values.map((value, i) => {
            if (value === 1 || value === 0) {
                return (
                <svg key={i} className={userId ? ("clickable"):("")} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100"
                onMouseEnter={() => starHoverIn(i)} onMouseLeave={starHoverOut} onClick={() => starClick(i)}>
                    <path fill={color[value]} d="M96.9,41.4l-22.2,21l5.6,30.3c0.1,0.9-0.2,1.7-0.9,2.2c-0.4,0.3-0.9,0.4-1.3,0.4s-0.8,0-1.1-0.2L50,80.4L23,95.1
                    c-0.7,0.4-1.6,0.3-2.3-0.1c-0.6-0.5-1-1.3-0.9-2.2l5.6-30.3L3.1,41.3c-0.5-0.5-0.7-1.4-0.5-2.2s0.9-1.3,1.7-1.4l30.6-4L48.1,5.8
                    C48.4,5,49.2,4.6,50,4.6s1.6,0.4,1.9,1.2l13.2,27.9l30.6,4c0.8,0.1,1.5,0.7,1.7,1.4C97.6,40,97.4,40.8,96.9,41.4z"/>
                </svg>
                )
            } else {
                return (
                <svg key={i} className={userId ? ("clickable"):("")} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100"
                onMouseEnter={() => starHoverIn(i)} onMouseLeave={starHoverOut} onClick={() => starClick(i)}>
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
    }
    
    const renderList = (list) => {
        return list.map( (item, i) => {
            return (<span key={i}>{item}</span>)
        })
    }

    useEffect(() => {
        const save = async (event) => {
            const body = {recipeId: data.id, userId: userId};
            if (userId) {
                try {
                    let response = await fetch(`/api/saveRecipe/`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    })
                    const parseRes = await response.json();
                    
                    if(parseRes.message) {
                        toast.success(parseRes.message);
                      } else {
                        toast.error(parseRes.error);
                      }
                } catch (err) {
                    console.error(err.message)
                }
                
            }
        }

        const saveBtn = document.querySelector(".saveRecipe");
        if (saveBtn && userId) {
            saveBtn.addEventListener("click", save);
            saveBtn.classList.remove("disabled");
            return () => {
                saveBtn.removeEventListener('click', save);
            };
        }
    }, [data.id, userId]);

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
                <button className='saveRecipe disabled'>Save Recipe</button>
            </div>
            <div className='extraInfo'>
                <img src={clock} alt="clock"/>
                <span className='time'>{data.time} min</span>
                <img src={chef} alt="user" />
                <span className='chef'>{data.username}</span>
            </div>
            <div className='mainInfo'>
                <div className='requirements'>
                    <div className='description'>{data.description}</div>
                    <h3>Ingredients:</h3>
                    <div className='ingredients'>{renderList(data.ingredient_names)}</div>
                    <h3>Equipment:</h3>
                    <div className='equipment'>{renderList(data.equipment_names)}</div>
                </div>
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