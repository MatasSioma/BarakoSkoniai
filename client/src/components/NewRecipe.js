import React from 'react';

function NewRecipe() {
  return (
    <div className='newRecipe'>
      <form method="post" action="/api/new" onsubmit="return false">
        <input type="text" placeholder="Title" name="title" required/>
        <input type="number" placeholder="Preparation time in minutes" name="time" step={1} min={0} />
        <input type="text" placeholder="Cucumber, Tomato, ..." name="ingredients" required/>
        <input type="text" placeholder="Oven, Frying pan, ..." name="equipment" />
        <p>If the name of Ingredients and Equipment isn't found in the table of I&E, check the console to specify other info</p>
        <p>Note: these names will be translated to ids and put into an array in the DB</p>
        <input type="text" placeholder="Description" name="description" />
        <input type="text" placeholder="Path to the picture: public/food.jpg" name="image" />
        <textarea
          name="steps"
          cols="30"
          rows="10"
          placeholder="Steps to the recipe formatted as [[<path_to_img / <link to yt>, <instruction text>], ...]"
        ></textarea>
        <input type="submit" value="Add Recipe" />
      </form>
    </div>
  );
}

export default NewRecipe;
