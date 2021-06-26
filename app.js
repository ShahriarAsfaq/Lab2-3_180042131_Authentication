const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoute.routes");
const morgan = require("morgan");


app.use(morgan("tiny"));
app.use(express.static("AdminLTE-master"));
app.use(userRoutes);



app.use((req, res) => {
  res.status(401).send("Page doesn't exist!");
});
module.exports = app;