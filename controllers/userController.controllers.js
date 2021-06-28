let flag = false;
const bodyParser = require("body-parser");

const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");
let alert = require('alert'); 
const postgres = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "tahmid",
    database: "auth",
  },
});
postgres.select('*').from('users').then(data => {
  console.log(data);
});

const{
  isUser,
  isRegistretionOk,
  islogin
} = require("./../middlewares/auth.middleware");

//const userlogin = require("./databaseController.controllers");

const getRegister = (req, res) => {
    res.sendFile("register-v2.html", { root: "./AdminLTE-master/pages/examples" });
  };
  
  const postRegister = (req, res) => {
    res.redirect("/login");
  };
  
  const getLogin = (req, res) => {
    res.sendFile("login-v2.html", { root: "./AdminLTE-master/pages/examples" });
  
  };

  const postLogin = (req, res) => {
     postgres
      .select("email", "hash")
      .from("users")
      .where("email", "=", req.body.email)
      .then((data) => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        console.log("post login");
        if (isValid) {
          postgres
            .select("*")
            .from("users")
            .where("email", "=", req.body.email)
            .then((user) => {
              console.log(user[0].email);
            
              alert("Welcome, "+user[0].fullname)
              res.sendFile("index.html", { root: "./AdminLTE-master" });
              
            })
            .catch((err) => res.status(400).send("cant find user"));
            
        } 
        else {
          res.status(400).send("wrong credential");
        }
      })
      .catch((err) => res.status(400).send("wrong credential"));
  };

 
  const getislogin=()=>{
    return flag;
  };
  
  const getDashboard = (req, res) => {
    
    
    res.sendFile("index.html", { root: "./AdminLTE-master" });
      flag = false;
    
    
  };
  
  module.exports = { getRegister, postRegister, getLogin, postLogin, getDashboard,getislogin};