import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import SmallRecipe from "./SmallRecipe";

function Home () {
    const navigate = useNavigate();

    const [ username, setName ] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:3001/auth/home", {
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();

            setName(parseRes.username);
        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token");
        navigate('/login')
        toast.success("Logged out Successfully");
    };

    useEffect(() => {
        getName();
    },[])

    return (
        <Fragment>
            <div id="homePage">
                 <h1>Home page {username} </h1>
                 <button className="btn btn-primary" onClick={e => logout(e)}>
                Logout
                </button>
                {/* 21 arba 9 */}
                <SmallRecipe recipe={{id: "9"}} loadUserIngredients={true}/>
                <SmallRecipe recipe={{id: "21"}} loadUserIngredients={true}/>


            </div>

        </Fragment>
    );
};

export default Home;
