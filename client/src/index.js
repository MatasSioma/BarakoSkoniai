import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './App.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Component imports
import Navbar from './components/Navbar';
import ErrorPage from "./ErrorPage";

import Home from './components/Home';
import NewRecipe from './components/NewRecipe';
import Users from './components/Users';

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <ErrorPage/>},
  { path: '/new', element: <NewRecipe /> },
  { path: '/users', element: <Users /> },
  // { path: '/*', element: <ErrorPage /> }
]);

function Root () {
  return (
    <>
      <Navbar/> {/* Navigation bar */}
      <RouterProvider router={router}/>
    </>
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
