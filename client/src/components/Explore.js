import React from "react";
import "./ExploreStyles.css";
import SmallRecipe from "./SmallRecipe.js";
import "./SmallRecipeStyles.css";

import searchItem from "../images/outline.svg";

function Explore() {
  return (
    <exp>
      <div className="start-container mx-auto justify-between items-center flex direction-column">
        <h1>Explore recipes</h1>
        <h2>
          Dive into our recipes, where every dish is a memory in the making,{" "}
          <br />
          Come, cook and create with us!
        </h2>
        <button id="search"><img src={searchItem} alt="Search" />Search</button>
      </div>

      <div className="recipe-container mx-auto flex justify-between">
        <div className="small-recipe">
          <SmallRecipe recipe={{ id: "9" }} loadUserIngredients={false} />
        </div>
        <div className="small-recipe">
          <SmallRecipe recipe={{ id: "21" }} loadUserIngredients={false} />
        </div>
        <div className="small-recipe">
          <SmallRecipe recipe={{ id: "24" }} loadUserIngredients={false} />
        </div>
      </div>
    </exp>
  );
}

export default Explore;
