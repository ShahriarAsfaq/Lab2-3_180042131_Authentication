const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");
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

const isloggedin=0;

const isUser = (req, res, next) => {
    if (req.method == "POST") {
      postgres
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
              //res.status(200).send(user[0].fullname);
              isloggedin=1;
              next();
            })
            .catch((err) => res.status(400).send("cant find user"));
            
        } 
        else {
          res.status(400).send("wrong credential");
        }
      })
      .catch((err) => res.status(400).send("wrong credential"));
     
     
     
     
     
      /* const email = req.body.email;
      const password = req.body.password;
      if (email==true) {
        next();
      } else {
        res.redirect("/login");
      }*/
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
      const retypepassword = req.body.retypepassword;
      if (FullName!=""&&Email!=""&&Password!=""&&retypepassword!="") {
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
  
  module.exports = {isRegistretionOk, isUser, isloggedin};