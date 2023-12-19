const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true })); // for parsing request body
const db = require("./database");

//middleware

app.use(express.json()); // req.body
app.use(cors());

app.use("/auth", require("./routes/jwtAuth"));

const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

// file uploading
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' +file.originalname)
    }
});
const upload = multer({ storage: storage });

// input inside of terminal
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

app.get('/api/users', (req, res) => {
  db.any('SELECT * FROM users')
  .then((data) => {
    res.send(data);
  })
  .catch((error) => {
    console.log('ERROR:', error)
  });
  
})

app.get('/api/recipeBasic/:recipeId', (req, res) => {
  // INNER JOIN users ON recipe.creator = users.id
  db.task('get-everything', async t => {
    const recipe = await t.one(
        "SELECT recipes.id, recipes.title, recipes.time, recipes.ingredient_ids, recipes.equipment_ids, recipes.rating, recipes.creator_id, recipes.rating_amount, recipes.description, recipes.pictures, users.username FROM recipes INNER JOIN users ON recipes.creator_id = users.id WHERE recipes.id = $1",
        [req.params.recipeId]);

    const ingredientNames = await t.any(
        "SELECT name FROM ingredients WHERE id = ANY($1)",
        [recipe.ingredient_ids]);

    const equipmentNames = await t.any(
        "SELECT name FROM equipment WHERE id = ANY($1)",
        [recipe.equipment_ids]);

    recipe.ingredient_names = ingredientNames.map(i => i.name);
    recipe.equipment_names = equipmentNames.map(e => e.name);
    
    return recipe;
})
  .then((data) => {
    res.send(data);
  })
  .catch((error) => {
    console.log('ERROR:', error)
  });
})

app.get('/api/recipeFull/:recipeId', (req, res) => {
  // INNER JOIN users ON recipe.creator = users.id
  db.task('get-everything', async t => {
    const recipe = await t.one(
        "SELECT recipes.id, recipes.title, recipes.time, recipes.ingredient_ids, recipes.equipment_ids, recipes.rating, recipes.creator_id, recipes.rating_amount, recipes.description, recipes.pictures, recipes.created, recipes.steps, users.username FROM recipes INNER JOIN users ON recipes.creator_id = users.id WHERE recipes.id = $1",
        [req.params.recipeId]);

    const ingredientNames = await t.any(
        "SELECT name FROM ingredients WHERE id = ANY($1)",
        [recipe.ingredient_ids]);

    const equipmentNames = await t.any(
        "SELECT name FROM equipment WHERE id = ANY($1)",
        [recipe.equipment_ids]);

    recipe.ingredient_names = ingredientNames.map(i => i.name);
    recipe.equipment_names = equipmentNames.map(e => e.name);

    const rating = await t.any("SELECT * FROM ratings WHERE recipe_id=$1", [req.params.recipeId])
    let tmp = {}
    for(let i = 0; i < rating.length; i++) {
      tmp[rating[i].user_id] = rating[i].rating;
    }
    recipe.ratings = tmp;

    return recipe;
})
  .then((data) => {
    // console.log(data);
    res.send(data);
  })
  .catch((error) => {
    console.log('ERROR:', error)
  });
})

app.post("/api/saveRecipe/", (req, res) => {
  db.any("SELECT * FROM saved_recipes WHERE user_id=$1 AND recipe_id=$2", [req.body.userId, req.body.recipeId]).then((data) => {
    if (data.length !== 0) {
      res.send({message: "Recipe already saved. Check your profile."})
      return;
    }
    try {
      db.any("INSERT INTO saved_recipes (user_id, recipe_id) VALUES ($1, $2)", [req.body.userId, req.body.recipeId])
      res.send({message: "Recipe saved successfully. Check your profile."})
    } catch (e) {
      console.error(e);
      res.send({error: "500 Internal server error. Failed to save recipe."})
    }

  }).catch((e)=> {
    console.error(e)
    res.send({error: "500 Internal server error. Failed to save recipe."})
  });
})

app.post("/api/rate", async (req, res) => {
  const data = req.body;
  let response = await db.any("SELECT * FROM ratings WHERE user_id=$1 AND recipe_id=$2", [data.userId, data.recipeId]);
  if (response.length !== 0) {
    try {
      db.any("UPDATE ratings SET rating=$1 WHERE user_id=$2 AND recipe_id=$3", [data.rating, data.userId, data.recipeId])
      res.send({message: "Rating updated.", action: 1})
    } catch(e) {
      console.error(e);
      res.send({error: "Error while updating the rating.", action: -1})
    }
    return;
  }
  try {
    db.any("INSERT INTO ratings (user_id, recipe_id, rating) VALUES($1, $2, $3)", [data.userId, data.recipeId, data.rating])
    // let recipe = await db.one("SELECT rating, rating_amount FROM recipes WHERE id=$1", [data.recipeId])
    let ratings = await db.any("SELECT * FROM ratings WHERE recipe_id=$1", [data.recipeId])
    let newRating = 0;
    for (let rating of ratings) {
      newRating += rating.rating;
    }
    newRating /= ratings.length;
    db.any("UPDATE recipes SET rating=$1, rating_amount=rating_amount+1 WHERE id=$2", [newRating, data.recipeId])

    res.send({message: "Recipe rated.", action: 0})
  } catch(e) {
    console.error(e);
    res.send({error: "Error while rating.", action: -1})
  }
})

app.post('/api/new', upload.array('images'), async (req, res) => {

  const formatedArray = (input) => { // input = "ingredients"/"equipment" (names of input fields)
    let list;
    list = req.body[input].replace(/\s/g, '').split(",");
    for(let i = 0; i < list.length; i++) // Capitalize first letter
    list[i] = list[i].charAt(0).toUpperCase() + list[i].slice(1).toLowerCase();

    return list;
  }

  // ingredients logic
  let ingredients = formatedArray("ingredients");
  const processIngredient = async (index) => {
    let response;
    try {
      response = await db.oneOrNone("SELECT id FROM ingredients WHERE name = $1", [ingredients[index]]);
    } catch (e) {
      console.log(e);
      console.log(`Parsing if ingredient ${ingredients[index]} exists.`)
      return;
    }

    if(response != null) {
      // turn the text into an id of the existing ingredient
      ingredients[index] = response.id;
      return;
    } else {
      const answer = await new Promise(resolve => {
        rl.question(`"${ingredients[index]}" grupė <betkokia tiksli reiksme is ingredients lenteles db "group"> (arba nauja): `, resolve);
      });

      try { 
        response = await db.one('INSERT INTO ingredients (name, "group") VALUES ($1, $2) RETURNING id', [ingredients[index], answer]);
        ingredients[index] = response.id;
      }
      catch (e) {console.log(e);}
    }
  }

  // equipment logic
  let equipment = formatedArray("equipment");
  const processEquipment = async (index) => {
    let response;
    try {
      response = await db.oneOrNone("SELECT id FROM equipment WHERE name = $1", [equipment[index]])
    } catch (e) {
      console.log(e);
      return;
    }

    if (response != null) {
      equipment[index] = response.id;
      return;
    } else {
      try {
        response = await db.one("INSERT INTO equipment (name) VALUES ($1) RETURNING id", [equipment[index]])
        equipment[index] = response.id;
      } catch (e) {
        console.log(e);
      }
    }
  }

  // turn ingredient/equipment strings to id's or make a new entry
  for (let i = 0; i < ingredients.length; i++) await processIngredient(i);
  for (let i = 0; i < equipment.length; i++) await processEquipment(i);

  const title = req.body.title;
  const time = req.body.time;
  const description = req.body.description;
  const steps = req.body.steps.split("; ");
  const currentDate = new Date();

  let imgPaths = [];
  for (let i = 0; i < req.files.length; i++) {
    imgPaths[i] = req.files[i].path.replace(/\\/g, "/");
  }

    try {
        response = await db.none('INSERT INTO recipes (title, time, ingredient_ids, equipment_ids, created, steps, description, pictures) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
        [title, time, ingredients, equipment, currentDate, steps, description, imgPaths]);
        console.log("recipe added");
    } catch (err) {
        console.error(err);
        console.log("recipe insert failed");
    }

  res.redirect("http://localhost:3000/");
})

// Accessing uploaded files: '<img src="http://localhost:3000/uploads/1699016554817-diagrama.png" alt="diagrama" />'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})