import React from "react";
import "./HomeStyles.css";

import fire_emoji from "../fire_emoji.svg";

import bowl from "../pics/first-part/bowl.svg";
import leaf from "../pics/first-part/leaf.svg";

import chef from "../pics/second-part/chef.svg";

import burger from "../pics/third-part/Burger.svg";

import berries from "../pics/fourth-part/berries.svg";
import blueberry from "../pics/fourth-part/blueberry.svg";
import mulberry from "../pics/fourth-part/mulberry.svg";
import strawberry from "../pics/fourth-part/strawberry.svg";
import woman from "../pics/fourth-part/woman.svg";

import light1 from "../pics/lights/light1.svg";

function Home() {
  return (
    <lan>
      {/*
      <img src={light1} className="light1" alt="light1" />
      <img src={leaf} className="leaf scale" alt="Leaf" />
      */}

      <div className="first-part container justify-center">
        <div className="text-content">
          <div className="leaf-place"></div>
          <h1>
            Never Worry About <br />
            <span id="what-to-cook">
              What To Cook <br />{" "}
            </span>
            <span id="Again">Again! </span>
          </h1>
          <h3>
            Escape the food decision struggle! Explore diverse user and AI
            recipes, making your meal choices effortless and exciting.
          </h3>
          <div className="get-started-part centered flex flex-col">
            <button id="get-started"> Get Started for free</button>
            <h4 className="credit">No credit-card required</h4>
          </div>
        </div>
        <div className="bowl-place">
          <img src={bowl} className="bowl scale" alt="Bowl" />
        </div>
      </div>

      <div className="features-part justify-content">
        <img src={fire_emoji} className="fire-emoji" />
        <h4 id="features-text">FEATURES</h4>
      </div>

      {/*<img src={light1} className="light2" alt="light2" /> */}

      <div className="second-part container">
        <div className="chef-place">
          <img src={chef} className="chef scale" alt="Chef" />
        </div>
        <div className="text-content">
          <h2>
            <span id="pick-a">Pick a</span> recipe!
          </h2>
          <h3>
            Take the struggle out of meal planning! Delve into diverse user and
            AI recipes, making your dining decisions effortless and enjoyable.
          </h3>
          <button id="explore">Explore</button>
        </div>
      </div>

      {/*
      <img src={light1} className="light3" alt="light3" />
      */}

      <div className="third-part container justify-center">
        <div className="text-content">
          <h2>
            <span id="create-with">Create with</span> AI!
          </h2>
          <h3>
            Would you like to experiment with recipe creation or simply have
            limited groceries in your fridge? The AI chef has got you covered!
          </h3>
          <button id="experiment">Experiment</button>
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
      <div className="fourth-part container">
        <div className="woman-place">
          <img src={woman} className="woman scale" alt="Woman" />
        </div>
        <div className="text-content">
          <h2>
            <span id="share-with-your">Share with your</span>
            <br />
            friends!
          </h2>
          <h3>
            Cooked up something amazing with our AI chef? Show off your culinary
            creations, inspire your friends, and let the flavors do the talking!
          </h3>
          <button id="my_profile">My profile</button>
        </div>
      </div>
    </lan>
  );
}

export default Home;
