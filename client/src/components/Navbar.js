import React from "react";
import logo from "../logo.svg";
import "./NavbarStyles.css";

function Navbar() {
  return (
    <nav>
      <div id="logo"><a href="#" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
          <span className="logotext">BarakoSkoniai</span></a>
      </div>

      <div id="navbar">
        <ul className="button-list">
          <li><a className="nav-button" href="#">Explore recipes</a></li>
          <li><a className="nav-button" href="#">Generate with AI</a></li>
          <li><a className="nav-button signup-button" href="#">Sign Up</a></li>
          <li><a className="nav-button signin-button" href="#">Sign In</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
