import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./ErrorPage";
import Main from './Main';
import NewRecipe from './components/NewRecipe';
import Users from './components/Users';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/new",
        element: <NewRecipe />,
      },
      {
        path: "/users",
        element: <Users/>
      },
      // {
      //   path: "/users",      Taip rasomi kiti "paths"
      //   element: <Login/>
      // },
    ],
  },
    
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
