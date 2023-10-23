import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';

const Dashboard = ({ setAuth }) => {
    const [ username, setName ] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
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
        setAuth(false);
        toast.success("Logged out Successfully");
    };

    useEffect(() => {
        getName();
    },[])

    return (
        <Fragment>
            <h1>Dashboard {username} </h1>
            <button className="btn btn-primary" onClick={e => logout(e)}>
                Logout
                </button>
        </Fragment>
    );
};

export default Dashboard;
