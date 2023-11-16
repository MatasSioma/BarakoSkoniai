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
const path = require('path');

// input inside of terminal
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

app.get('/api/users', (req, res) => {
  console.log("called");

  db.any('SELECT * FROM users')
  .then((data) => {
    res.send(data);
  })
  .catch((error) => {
    console.log('ERROR:', error)
  });
  
})

app.get("/lol", (req, res) => {
  res.send("lol");
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

