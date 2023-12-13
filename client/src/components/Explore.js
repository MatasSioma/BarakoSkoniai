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
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/allRecipes");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  // Group recipes into sets of three
  const groupedRecipes = chunkArray(filteredRecipes, 3);

  // Handle search input change
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = recipes.filter(
      (recipe) => recipe.title.toLowerCase().includes(searchTerm)
    );
    setFilteredRecipes(filtered);
  };

  return (
    <exp>
      <div className="start-container mx-auto justify-between items-center flex direction-column">
        <h1>Explore recipes</h1>
        <h2>
          Dive into our recipes, where every dish is a memory in the making,{" "}
          <br />
          Come, cook and create with us!
        </h2>
        <div className="search-container">
          <input
            id="search"
            type="text"
            placeholder={`Search for recipes ${searchItem ? "..." : ""}`}
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              backgroundImage: `url(${searchItem})`,
              backgroundSize: "20px 20px",
              backgroundPosition: "10px center",
              backgroundRepeat: "no-repeat",
              paddingLeft: "40px",
            }}
          />
        </div>
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
