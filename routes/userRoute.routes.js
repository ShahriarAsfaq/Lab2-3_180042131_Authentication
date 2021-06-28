const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

const{
  isUser,
  isRegistretionOk,
  islogin
} = require("./../middlewares/auth.middleware");

const {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getDashboard
} = require("./../controllers/userController.controllers");
const { route } = require("../app");


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
//router.get("/",getLogin);

router.get("/login",getLogin);
router.get("/register",getRegister);
router.post("/login",postLogin);
/*const checklogin=(isloggedin)=>{

};*/
//console.log(localStorage.getItem('localisloggedin'));

router.get("/dashboard",islogin, getDashboard);
router.get("/",(req,res)=>{
  res.sendFile("login-v2.html", { root: "./AdminLTE-master/pages/examples" });
});


router.route("/register").all(isRegistretionOk).get(getRegister).post(postRegister);




module.exports = router;