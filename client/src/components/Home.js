import React, { useEffect } from "react";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Logout } from "./Logout";
import { useAuth } from "./AuthContext";

import "./HomeStyles.css";

import fire_emoji from "../fire_emoji.svg";

import bowl from "../pics/first-part/bowl.svg";
import chef from "../pics/second-part/chef.svg";
import burger from "../pics/third-part/Burger.svg";
import woman from "../pics/fourth-part/woman.svg";


function Home() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Token has expired
        Logout(navigate, toast);
        logout();
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration();
    // Set up an interval to check token expiration every minute
    const intervalId = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  });

  const handleProfileClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      // Token is present, navigate to the user profile page
      navigate("/users");
    } else {
      // No token found, redirect to the login page
      navigate("/login");
      toast.error("Please Log in in order to access profile page");
    }
  };

  return (
    <lan>
      {/*
      <img src={light1} className="light1" alt="light1" />
      <img src={leaf} className="leaf scale" alt="Leaf" />
      */}

      <div className="first-part homeContainer justify-center">
        <div className="text-content">
          <div className="leaf-place"></div>
          <h1 className="homeHeader">
            Never Worry About <br />
            <span id="what-to-cook">
              What To Cook <br />{" "}
            </span>
            <span id="Again">Again! </span>
          </h1>
          <h3 className="homeHeader">
            Escape the food decision struggle! Explore diverse user and AI
            recipes, making your meal choices effortless and exciting.
          </h3>
          <div className="get-started-part centered flex flex-col">
            <Link to="/Login"><button id="get-started"> Get Started for free</button></Link>
            <h4 className="homeHeader credit">No credit-card required</h4>
          </div>
        </div>
        <div className="bowl-place">
          <img src={bowl} className="bowl scale" alt="Bowl" />
        </div>
      </div>

      <div className="features-part justify-content">
        <img src={fire_emoji} className="fire-emoji" />
        <h4 className="homeHeader" id="features-text">
          FEATURES
        </h4>
      </div>

      {/*<img src={light1} className="light2" alt="light2" /> */}

      <div className="second-part homeContainer">
        <div className="chef-place">
          <img src={chef} className="scale" alt="Chef" />
        </div>
        <div className="text-content">
          <h2 className="homeHeader">
            <span id="pick-a">Pick a</span> recipe!
          </h2>
          <h3 className="homeHeader">
            Take the struggle out of meal planning! Delve into diverse user and
            AI recipes, making your dining decisions effortless and enjoyable.
          </h3>
          <Link to="/explore"><button id="explore">Explore</button></Link>
        </div>
      </div>

      {/*
      <img src={light1} className="light3" alt="light3" />
      */}

      <div className="third-part homeContainer justify-center">
        <div className="text-content">
          <h2 className="homeHeader">
            <span id="create-with">Create with</span> AI!
          </h2>
          <h3 className="homeHeader">
            Would you like to experiment with recipe creation or simply have
            limited groceries in your fridge? The AI chef has got you covered!
          </h3>
          <Link to="/new"><button id="experiment">Experiment</button></Link>
        </div>
        <div className="burger-place">
          <img src={burger} className="burger scale" alt="Burger" />
        </div>
      </div>
      {/*<img src={light1} className="light4" alt="light4" /> */}

      {/*
      <div className="fourth-pics">
        <img src={berries} className="berries" alt="Berries" />
        <img src={mulberry} className="mulberry" alt="Mulberry" />
      </div>
      */}
      <div className="fourth-part homeContainer">
        <div className="woman-place">
          <img src={woman} className="woman scale" alt="Woman" />
        </div>
        <div className="text-content">
          <h2 className="homeHeader">
            <span id="share-with-your">Share with your</span>
            <br />
            friends!
          </h2>
          <h3 className="homeHeader">
            Cooked up something amazing with our AI chef? Show off your culinary
            creations, inspire your friends, and let the flavors do the talking!
          </h3>
          <Link><button id="my_profile" onClick={handleProfileClick}>My Profile</button></Link>
        </div>
      </div>
    </lan>
  );
}

export default Home;
