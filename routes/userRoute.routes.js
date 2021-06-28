const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const{
  isUser,
  isRegistretionOk,
  isloggedin
} = require("./../middlewares/auth.middleware");

const {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getDashboard
} = require("./../controllers/userController.controllers");


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
//router.get("/",getLogin);

router.get("/login",getLogin);
router.get("/register",getRegister);

if(isloggedin==1){
router.get("/dashboard", getDashboard);
} 


router.route("/register").all(isRegistretionOk).get(getRegister).post(postRegister);
router.route("/login").all(isUser).get(getLogin).post(postLogin);

module.exports = router;