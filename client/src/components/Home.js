import React from "react";
import fire_emoji from "../fire_emoji.svg";
import "./HomeStyles.css";

function Home () {
  return (
    <lan>
      <div id="first-part">
        <div className="circle"></div>
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