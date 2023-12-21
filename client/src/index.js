import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './App.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './components/AuthContext';

// Component imports
import Navbar from './components/Navbar';
import ErrorPage from "./ErrorPage";
import Home from './components/Home';
import NewRecipe from './components/NewRecipe';
import Users from './components/Users';
import Login from './components/Login';
import Register from './components/Register';
import Recipe from './components/Recipe';
import Find from './components/Find';
import Explore from './components/Explore';

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <ErrorPage/>},
  { path: '/new', element: <NewRecipe /> },
  { path: '/users', element: <Users /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/recipe/:id', element: <Recipe /> },
  { path: '/find', element: <Find /> },
  { path: '/explore', element: <Explore /> },

  // { path: '/*', element: <ErrorPage /> }
]);


function Root () {
  return (
    <AuthProvider>
        <Navbar/> {/* Navigation bar */}
        <RouterProvider router={router}/>
        <ToastContainer />
    </AuthProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Root/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();