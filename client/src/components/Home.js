import React from "react";
import "./HomeStyles.css";

import fire_emoji from "../fire_emoji.svg";

import bowl from "../pics/first-part/bowl.svg";
import chili from "../pics/first-part/chili.svg";
import leaf from "../pics/first-part/leaf.svg";
import leaf2 from "../pics/first-part/leaf2.svg";
import tomatoe from "../pics/first-part/tomatoe.svg";

import chef from "../pics/second-part/chef.svg";
import spinachio from "../pics/second-part/spinachio.svg";
import onion from "../pics/second-part/onion.svg";
import popcorn from "../pics/second-part/popcorn.svg";

import burger1 from "../pics/third-part/burger1.svg";
import burger2 from "../pics/third-part/burger2.svg";
import leaf3 from "../pics/third-part/leaf3.svg";
import onion1 from "../pics/third-part/onion1.svg";
import spinach from "../pics/third-part/spinach.svg";
import tomatoe3 from "../pics/third-part/tomatoe3.svg";

import berries from "../pics/fourth-part/berries.svg";
import blueberry from "../pics/fourth-part/blueberry.svg";
import dots from "../pics/fourth-part/dots.svg";
import dots1 from "../pics/fourth-part/dots1.svg";
import mulberry from "../pics/fourth-part/mulberry.svg";
import strawberry from "../pics/fourth-part/strawberry.svg";
import woman from "../pics/fourth-part/woman.svg";

import light1 from "../pics/lights/light1.svg";

function Home() {
  return (
    <lan>
      <div className="first-pics">
        <img src={leaf} className="leaf" alt="Leaf" />
        <img src={bowl} className="bowl" alt="Bowl" />
        <img src={leaf2} className="leaf2" alt="Leaf 2" />
        <img src={chili} className="chili" alt="Chili" />
        <img src={tomatoe} className="tomatoe" alt="Tomato" />
      </div>
      <img src={light1} className="light1" alt="light1" />
      <div className="form1"></div>

      <div id="first-part">
        <h1>
          Never Worry About <br />
          <span id="what-to-cook-again">
            What To Cook <br />
            Again!{" "}
          </span>
        </h1>
        <h3>
          Escape the food decision struggle! Explore diverse user and AI
          recipes, making your meal choices effortless and exciting.
        </h3>
        <button id="get-started"> Get Started for free</button>
        <h4>No credit-card required</h4>
      </div>

      <div id="features-part">
        <img src={fire_emoji} className="fire-emoji" />
        <h4 id="features-text">FEATURES</h4>
      </div>

      <img src={light1} className="light2" alt="light2" />
      <div className="form2"></div>
      <div className="second-pics">
        <img src={chef} className="chef" alt="Chef" />
        <img src={spinachio} className="spinachio" alt="Spinach" />
        <img src={spinachio} className="spinachio1" alt="Spinach" />
        <img src={onion} className="onion" alt="Onion" />
        <img src={popcorn} className="popcorn" alt="Popcorn" />
      </div>

      <div id="second-part">
        <h2>
          <span id="pick-a">Pick a</span> recipe!
        </h2>
        <h3>
          Take the struggle out of meal planning! Delve into diverse user and AI
          recipes, making your dining decisions effortless and enjoyable.
        </h3>
        <button id="explore">Explore</button>
      </div>

      <img src={light1} className="light3" alt="light3" />
      <div className="form3"></div>
      <div className="third-pics">
        <img src={burger1} className="burger1" alt="Burger 1" />
        <img src={burger2} className="burger2" alt="Burger 2" />
        <img src={leaf3} className="leaf3" alt="Leaf 3" />
        <img src={leaf3} className="leaf4" alt="Leaf 3" />
        <img src={onion1} className="onion1" alt="Onion 1" />
        <img src={onion1} className="onion2" alt="Onion 1" />
        <img src={spinach} className="spinach" alt="Spinach" />
        <img src={tomatoe3} className="tomatoe3" alt="Tomatoe 3" />
        <img src={tomatoe3} className="tomatoe4" alt="Tomatoe 3" />
      </div>

      <div id="third-part">
        <h2>
          <span id="create-with">Create with</span> AI!
        </h2>
        <h3>
          Would you like to experiment with recipe creation or simply have
          limited groceries in your fridge? The AI chef has got you covered!
        </h3>
        <button id="experiment">Experiment</button>
      </div>

      <img src={light1} className="light4" alt="light4" />
      <div className="form4"></div>
      <div className="form5"></div>
      <div className="fourth-pics">
        <img src={woman} className="woman" alt="Woman" />
        <img src={berries} className="berries" alt="Berries" />
        <img src={blueberry} className="blueberry" alt="Blueberry" />
        <img src={dots} className="dots" alt="Dots" />
        <img src={dots1} className="dots1" alt="Dots 1" />
        <img src={mulberry} className="mulberry" alt="Mulberry" />
        <img src={strawberry} className="strawberry" alt="Strawberry" />
      </div>

      <div id="fourth-part">
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
    </lan>
  );
}

export default Home;
