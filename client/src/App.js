import React, { Fragment, useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

//components

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuth, setAuth] = useState(false)

  const setIsAuth = Boolean => {
    setAuth(Boolean);
  };

  async function checkAuth() {
    try { 

      const response = await fetch("http://localhost:5000/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();
      
      parseRes === true ? setAuth(true): setAuth(false);

    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    checkAuth();
  })

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route path='/login' 
            element={
              <PublicRoute isAuth={isAuth}>
                 <Login setAuth={setAuth} />
              </PublicRoute>
            } 
            />
            <Route path='/register'
            element={
              <PublicRoute isAuth={isAuth}>
                 <Register setAuth={setAuth} />
              </PublicRoute>
            } 
            />
            <Route path='/dashboard'
             element={
              <PrivateRoute isAuth={isAuth}>
                <Dashboard setAuth={setAuth} />
              </PrivateRoute>
             }
             />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </Fragment>
    );
}

export default App;
