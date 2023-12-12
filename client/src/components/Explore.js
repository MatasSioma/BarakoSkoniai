import React from "react";
import "./ExploreStyles.css";
import SmallRecipe from "./SmallRecipe.js";
import "./SmallRecipeStyles.css";

function Explore() {
  return (
    <exp>
      <div className="start container mx-auto justify-between items-center flex">
        <h1>Explore recipes</h1>
        <h2>
          Dive into our recipes, where every dish is a memory in the making,{" "}
          <br />
          Come, cook and create with us!
        </h2>
        <button id="search">Search</button>
      </div>

      <div className="recipes container mx-auto flex justify-between">
        <div className="small-recipe">
          <SmallRecipe />
        </div>
        <div className="small-recipe"></div>
        <div className="small-recipe"></div>
      </div>
    </exp>
  );
}

export default Explore;
