import React, { Fragment, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { Logout } from "./Logout";

import SmallRecipe from "./SmallRecipe";

function Home() {
    const navigate = useNavigate();

    const logout = async (e) => {
        e.preventDefault();
        await Logout(navigate, toast);
    }

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
            }
        }
    }, [navigate]);

    return (
        <Fragment>
            <div id="homePage">
                 <h1>Home page</h1>
                {/* 21 arba 9 */}
                <SmallRecipe recipe={{id: "21"}}/>

            </div>
        </Fragment>
    );
}

export default Home;
