const express = require("express");
const app = express();
const cors = require("cors");

//middleware

app.use(express.json()); // req.body
app.use(cors());

//routes//

//register and login routes

app.use("/", require("./routes/jwtAuth"));


app.listen(5000, () => {
    console.log("server is running on port 5000");
});
