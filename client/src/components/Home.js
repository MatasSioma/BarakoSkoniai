import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode as jwt_decode } from 'jwt-decode';

import SmallRecipe from "./SmallRecipe";

function Home() {
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

    const logout = async (e) => {
        e.preventDefault();

        try {
            const logoutRequest = fetch('http://localhost:3001/auth/logout', {
                headers: {
                    token: localStorage.token,
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            localStorage.removeItem("token");
            navigate('/login');
            toast.success("Logged out Successfully");

            await logoutRequest;
        } catch (err) {
            console.error(err.message);
            console.error("Nepavyko logout'as");
        }
    };

    useEffect(() => {
        const token = localStorage.token;
        if (token) {
            const decodedToken = jwt_decode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                console.log("pasibaige tokeno laikas");
                fetch('http://localhost:3001/auth/expiration', {
                    headers: {
                        token: localStorage.token,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                })
                .then(() => {
                    localStorage.removeItem("token");
                    navigate('/login');
                    toast.success("Token expired. Logged out Successfully");
                })
                .catch((error) => {
                    console.error('Error updating is_online status:', error);
                    localStorage.removeItem("token");
                    navigate('/login');
                    toast.success("Token expired. Logged out Successfully");
                });
            } else {
                getName();
            }
        }
    }, [navigate]);

    return (
        <Fragment>
            <div id="homePage">
                <h1>Home page {username} </h1>
                <button className="btn btn-primary" onClick={e => logout(e)}>
                    Logout
                </button>
                <SmallRecipe recipe={{ id: "21" }} loadUserIngredients={true} />
            </div>
        </Fragment>
    );
}

export default Home;
