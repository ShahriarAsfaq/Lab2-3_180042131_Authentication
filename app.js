const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes.routes");
const morgan = require("morgan");

const { logger, printSomething } = require("./middlewares/app.middlewares");

//app.use([logger, printSomething]);
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(userRoutes);


app.use((req, res) => {
  res.status(401).send("Page doesn't exist!");
});
module.exports = app;