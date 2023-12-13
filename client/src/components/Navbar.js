import React from "react";
import logo from "../images/logo.svg";
import "./NavbarStyles.css";
import { Logout } from "./Logout";

function Navbar() {
  const IsOnline = !!localStorage.token;
  console.log(IsOnline);
  if (IsOnline) {
    return (
      <nav>
        <div className="nav-container">
          <div id="logo">
            <a href="/" className="logo-link">
              <img src={logo} alt="Logo" className="logo" />
              <span className="logotext">BarakoSkoniai</span>
            </a>
          </div>

          <div id="navbar">
            <ul className="button-list">
              <li>
                <a className="nav-button" href="/explore">
                  Explore recipes
                </a>
              </li>
              <li>
                <a className="nav-button" href="/new">
                  Generate with AI
                </a>
              </li>
              <li>
                <a
                  className="nav-button signup-button"
                  href="/login"
                  onClick={Logout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav>
        <div className="nav-container">
          <div id="logo">
            <a href="/" className="logo-link">
              <img src={logo} alt="Logo" className="logo" />
              <span className="logotext">BarakoSkoniai</span>
            </a>
          </div>

          <div id="navbar">
            <ul className="button-list">
              <li>
                <a className="nav-button" href="/explore">
                  Explore recipes
                </a>
              </li>
              <li>
                <a className="nav-button" href="/new">
                  Generate with AI
                </a>
              </li>
              <li>
                <a className="nav-button signup-button" href="/Register">
                  Sign Up
                </a>
              </li>
              <li>
                <a className="nav-button signin-button" href="/Login">
                  Sign In
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
