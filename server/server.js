// paleisti serveri: $ npm start
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// .env config (skirta saugoti slaptozodzius kad jie nebutu uploadinti i githuba)
const dotenv = require('dotenv');
dotenv.config();

// pg-promise, SQL, query - tie keiksmazodziai su kuriais klauskit dalyku ChatGPT arba
// Duomenu bazes config 
const pgp = require('pg-promise')(/* options */);
const db = pgp(`postgres://chefas:${process.env.db_pass}@194.31.55.150:5432/bs`);

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})