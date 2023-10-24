import React from 'react'
import logo from './logo.svg';
import './App.css';

import { Helmet } from 'react-helmet';
import { Outlet, Link } from "react-router-dom";

import Navbar from './components/Navbar';

function Main () {
  return (
    <div className='App'>

        <Navbar/> {/* Navigation bar */}

        <header className="App-header">
            <Link to={"/"}><img src={logo} className="App-logo" alt="logo" /></Link>
            <Link to={`users`}>User Page</Link>
            <Link to={`new`}>New Recipe</Link>
        </header>

        {/* Cia yra tas elementas kuris priklauso nuo linko pvz.: /new (zr. index.js faila) */}
        <Outlet/>
        
        <Helmet>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet"/>
        </Helmet>
    </div>
  );
}

export default Main;