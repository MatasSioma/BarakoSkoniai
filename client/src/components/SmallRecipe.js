import React, { useState, useEffect } from "react";
import "./SmallRecipeStyles.css";
import chef from "../images/chef.svg";
import clock from "../images/clock.svg";
import { stars } from "./Recipe";

function SmallRecipe({ recipe, loadUserIngredients }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/recipeBasic/${recipe.id}`);
        if (!response.ok) throw new Error("Netwrok is nekazka bro");
        const data = await response.json();
        // console.log(data, typeof(data));
        setData(data);
      } catch (error) {
        // console.log(error);
        console.log(
          "failed... Make sure server running (npm start in when in server directory)"
        );
      }
    };
    fetchData();
  }, [recipe.id]);

  const renderMissing = () => {
    let ingredients = JSON.parse(localStorage.getItem("userIngredients"));
    let equipment = JSON.parse(localStorage.getItem("userEquipment"));

    // finds the difference in recipe ingredients/equip and user's ingredients/equip
    ingredients =
      ingredients != null
        ? data.ingredient_ids.filter((item) => !ingredients.includes(item))
        : [];
    equipment =
      equipment != null
        ? data.equipment_ids.filter((item) => !equipment.includes(item))
        : [];

    // console.table(ingredients);
    // console.table(equipment);

    return (
      <div className="missing">
        {ingredients.length !== 0 ? (
          <div className="ingredients">
            <span>Missing ingredients:</span>
            {ingredients.map((ingredient, i) => {
              return (
                <span key={i}>
                  {
                    data.ingredient_names[
                      data.ingredient_ids.indexOf(ingredient)
                    ]
                  }
                </span>
              );
            })}
          </div>
        ) : (
          <></>
        )}

        {equipment.length !== 0 ? (
          <div className="equipment">
            <span>Missing equipment:</span>
            {equipment.map((equip, i) => {
              return (
                <span key={i}>
                  {data.equipment_names[data.equipment_ids.indexOf(equip)]}
                </span>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <div className="smallRecipe">
      {data.length !== 0 ? (
        <>
          <img src={"/" + data.pictures} alt="Recipe" />
          <div>
            <div className="extraInfo">
              <span className="chef">{data.username} • {data.time} min</span>
              <div className="rating">
              {stars(data.rating)}
              <span>({data.rating_amount})</span>
              </div>
            </div>

            <div className="recipe-title">
              <h3>{data.title}</h3>
              
            </div>



            <div className="description">{data.description}</div>

            {loadUserIngredients ? renderMissing() : <></>}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SmallRecipe;
