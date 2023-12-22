import React, { useState, useEffect } from "react"
import "./FindStyles.css";
import SmallRecipe from "./SmallRecipe";

const convertList = {1: "userIngredients", 2: "userEquipment"};

function Find() {
    if(!localStorage.getItem(convertList[1])) localStorage.setItem("userIngredients", "[]");
    if(!localStorage.getItem(convertList[2])) localStorage.setItem("userEquipment", "[]");

    const [selections, setSelections] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState(JSON.parse(localStorage.getItem(convertList[1])));
    const [selectedEquipment, setSelectedEquipment] = useState(JSON.parse(localStorage.getItem(convertList[2])));
    const [recipes, setRecipes] = useState([]);

    function toggleSelection(id, type) {
        let ids = JSON.parse(localStorage.getItem(convertList[type])) || [];
    
        let element;
        if (type === 1) element = document.querySelector(`.selectIngredients span[data-id="${id}"]`);
        else element = document.querySelector(`.selectEquipment span[data-id="${id}"]`);
        
    
        function addId(id, type) {
            if (!ids.includes(id)) {
                ids.push(id);
                if(type === 1) setSelectedIngredients(ids);
                else setSelectedEquipment(ids);

                localStorage.setItem(convertList[type], JSON.stringify(ids));
            }
        }
    
        function deleteId(id, type) {
            let index = ids.indexOf(id);
            if (index !== -1) {
                ids.splice(index, 1);
                if(type === 1) setSelectedIngredients(ids);
                else setSelectedEquipment(ids);
                localStorage.setItem(convertList[type], JSON.stringify(ids));
            }
        }
    
        if(!ids.includes(id)) {
            addId(id, type);
            element.classList.add("selected");
        } else {
            deleteId(id, type);
            element.classList.remove("selected");
        }
    
    }

    useEffect(() => {
        const getSelectables = async () => {
            let response = await fetch("/api/selectables");
            if(!response.ok) throw new Error('Failed to fetch ingredients and equipment');
            response = await response.json();
            console.log(response)
            setSelections(response);
        }
        getSelectables();
    }, [])

    const renderIngredients = () => {
        return (
            <>
            <div className="selectIngredients">
                <h3>Ingredients:</h3>
                {selections.ingredients.map((ingredient, i) => {
                    return (
                        <span
                        key={i}
                        className={selectedIngredients.includes(ingredient.id) ? ("selected"):("")}
                        data-id={ingredient.id}
                        onClick={() => toggleSelection(ingredient.id, 1)}>
                            {ingredient.name}
                        </span>
                    )
                })}
            </div>

            <div className="selectEquipment">
                <h3>Equipment:</h3>
                {selections.equipment.map((equipment, i) => {
                    return (
                        <span
                        key={i}
                        data-id={equipment.id}
                        className={selectedEquipment.includes(equipment.id) ? ("selected"):("")}
                        onClick={() => toggleSelection(equipment.id, 2)}>
                            {equipment.name}
                        </span>
                    )
                })}
            </div>
            </>
        )
    }

    const findRecipes = async () => {
        // const container = document.querySelector("#findPage .recipes");

        let response = await fetch(`/api/find/${JSON.stringify(selectedIngredients)}/${JSON.stringify(selectedEquipment)}`);
        if(!response.ok) throw new Error("Failed to fetch (find) recipes with selected ingredients and equipment")
        response = await response.json();

        console.log(response)
        setRecipes(response);

    }

    return (
        <div id="findPage">
            {selections.length !== 0 ? (
                <>
                <div className="selection">
                    {renderIngredients()}
                </div>
                <div className="actions">
                    <a onClick={findRecipes}>
                        Find existing recipes
                    </a>
                    <span>/</span>
                    <a>
                        Generate with AI
                    </a>
                </div>
                {/* <div className="allowMissing">
                    <span>Show recipes with 2 missing ingredients?</span>
                    <input type="checkbox" />
                </div> */}
                <div className="recipes">
                    {recipes.map((recipeId, i) => {
                        return <SmallRecipe
                        key={i}
                        recipe={{ id: recipeId }}
                        loadUserIngredients={true}
                      />
                    })}
                </div>
                </>
            ):(
                <p>Loading selections...</p>
            )}
            
        </div>
    )
}

export default Find;