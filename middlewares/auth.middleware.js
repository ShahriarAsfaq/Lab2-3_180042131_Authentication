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

const isUser = (req, res, next) => {
    if (req.method == "POST") {
     /* postgres
      .select("email", "hash")
      .from("login")
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
              res.status(200).json(user[0].email);
            })
            .catch((err) => res.status(400).json("cant find user"));
            next();
        } 
        else {
          res.status(400).json("wrong credential");
        }
      })
      .catch((err) => res.status(400).json("wrong credential"));
     
     
     
     
     
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
  
  module.exports = isUser;

  const isRegistretionOk = (req, res, next) => {
    if (req.method == "POST") {
      const FullName = req.body.FullName;
      const Email = req.body.Email;
      const Password = req.body.Password;
      const retypepassword = req.body.retypepassword;
      if (FullName!=""&&Email!=""&&Password!=""&&retypepassword!="") {
        const hash = bcrypt.hashSync(Password);
        postgres('users').insert({
          email: Email,
          fullname: FullName,
          hash: hash 
        }).then(console.log)
        next();
      } else {
        res.redirect("/register");
      }
    } else {
      next();
    }
  };
  
  module.exports = isRegistretionOk;