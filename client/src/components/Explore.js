import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ExploreStyles.css";
import SmallRecipe from "./SmallRecipe.js";
import "./SmallRecipeStyles.css";
import searchItem from "../images/outline.svg";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { toast } from "react-toastify";
import { Logout } from "./Logout";
import { useAuth } from "./AuthContext";

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
  const [isMobile, setIsMobile] = useState(false);
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

    const mobileMediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mobileMediaQuery.matches); // Set initial state based on the media query

    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches); // Update state based on media query changes
    };

    mobileMediaQuery.addEventListener("change", handleMediaQueryChange); // Listen for changes in the media query

    return () => {
      // Cleanup: remove the listener when the component unmounts
      mobileMediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Group recipes into sets of three
  let groupedRecipes;
  if (isMobile) {
    groupedRecipes = chunkArray(filteredRecipes, 1);
  } else {
    groupedRecipes = chunkArray(filteredRecipes, 3);
  }
  // Handle search input change
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm)
    );
    setFilteredRecipes(filtered);
  };

  return (
    <exp>
      <div className="start-container mx-auto items-center flex direction-column">
        <h1>Explore recipes</h1>
        <h2>
          Dive into our recipes, where every dish is a memory in the making,{" "}
          <br />
          Come, cook and create with us!
        </h2>
        <div className="search-container">
          <input
            id="search"
            type="search"
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
        <div key={index} className="recipe-container mx-auto flex">
          {group.map((recipe) => (
            <div key={recipe.id} className="small-recipe">
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <SmallRecipe
                  recipe={{ id: recipe.id }}
                  loadUserIngredients={false}
                />
              </Link>
            </div>
          ))}
        </div>
      ))}
    </exp>
  );
}

export default Explore;
