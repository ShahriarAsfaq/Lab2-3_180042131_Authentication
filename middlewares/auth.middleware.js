const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");
//let alert = require('alert');  


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

let isloggedin=false;

const isUser = (req, res, next) => {
    if (req.method == "POST") {
     /* postgres
      .select("email", "hash")
      .from("users")
      .where("email", "=", req.body.email)
      .then((data) => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
  
        if (isValid) {
          postgres
            .select("*")
            .from("users")
            .where("email", "=", req.body.email)
            .then((user) => {
              console.log(user[0].email);
            
              isloggedin=true;
              localStorage.setItem('localisloggedin',isloggedin);
              
              alert("Welcome, "+user[0].fullname)
              
              next();
            })
            .catch((err) => res.status(400).send("cant find user"));
            
        } 
        else {
          res.status(400).send("wrong credential");
        }
      })
      .catch((err) => res.status(400).send("wrong credential"));
     */
    next();
    } 
    
    else {
      next();
    }
    
  };
  


  const isRegistretionOk = (req, res, next) => {
    if (req.method == "POST") {
      const FullName = req.body.FullName;
      const Email = req.body.Email;
      const Password = req.body.Password;
      const retypePassword = req.body.retypePassword;
      console.log(retypePassword);
      if (FullName!=""&&Email!=""&&Password!=""&&retypePassword!=""&&Password.length>=6&&Password===retypePassword) {
        const hash = bcrypt.hashSync(Password);
        postgres('users')
        .returning('*')
        .insert({
          email: Email,
          fullname: FullName,
          hash: hash 
        })
        .then(response =>{
          res.status(200);
          next();
        })
        .catch((err) => res.status(400).send("registration error duplicate value"));
      } else {
        res.redirect("/register");
      }
    } else {
      next();
    }
  };
  
const islogin=(req,res,next)=>{
  const {
    getislogin,
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    getDashboard
  } = require("./../controllers/userController.controllers");
    
  if(getislogin()){
    next();
  } else {
    res.redirect("/login");
    next();
  }
};
 
  module.exports = {isRegistretionOk, isUser, islogin};