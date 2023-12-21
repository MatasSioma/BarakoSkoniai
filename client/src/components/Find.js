import React, { useState, useEffect } from "react"

const convertList = {1: "userIngredients", 2: "userEquipment"};

function addId(id, type) {
    let ids = JSON.parse(localStorage.getItem('user_ingredients')) || [];
    if (!ids.includes(id)) {
        ids.push(id);
        localStorage.setItem('user_ingredients', JSON.stringify(ids));
    }
}

// Delete (Remove an ID)
function deleteId(id, type) {
    let ids = JSON.parse(localStorage.getItem('user_ingredients')) || [];
    let index = ids.indexOf(id);
    if (index !== -1) {
        ids.splice(index, 1);
        localStorage.setItem('user_ingredients', JSON.stringify(ids));
    }
}

function Find() {
    const [selections, setSelections] = useState([]);

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
        return 
    }

    return (
        <div id="findPage">
            {selections.length !== 0 ? (
                <p></p>
            ):(
                <p>Loading selections...</p>
            )}
            
            {JSON.stringify(selections)}
        </div>
    )
}

export default Find;