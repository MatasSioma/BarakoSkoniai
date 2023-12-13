import React, { useEffect, useState } from "react";
import "./ExploreStyles.css";
import SmallRecipe from "./SmallRecipe.js";
import "./SmallRecipeStyles.css";
import searchItem from "../images/outline.svg";

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

function Explore() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/allRecipes");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  // Group recipes into sets of three
  const groupedRecipes = chunkArray(recipes, 3);

  return (
    <exp>
      <div className="start-container mx-auto justify-between items-center flex direction-column">
        <h1>Explore recipes</h1>
        <h2>
          Dive into our recipes, where every dish is a memory in the making,{" "}
          <br />
          Come, cook and create with us!
        </h2>
        <button id="search">
          <img src={searchItem} alt="Search" />
          Search
        </button>
      </div>

      {groupedRecipes.map((group, index) => (
        <div
          key={index}
          className="recipe-container mx-auto flex justify-between"
        >
          {group.map((recipe) => (
            <div key={recipe.id} className="small-recipe">
              <SmallRecipe
                recipe={{ id: recipe.id }}
                loadUserIngredients={false}
              />
            </div>
          ))}
        </div>
      ))}
    </exp>
  );
}

export default Explore;
