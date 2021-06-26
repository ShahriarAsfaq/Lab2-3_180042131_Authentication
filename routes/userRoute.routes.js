const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const isUser = require("./../middlewares/auth.middleware");
const {
  getRegister,
  postRegister,
  getLogin,
  
} = require("./../controllers/userController.controllers");

//router.use(bodyParser.urlencoded({ extended: false }));
//router.use(bodyParser.json());
router.get("/",getLogin);

router.get("/login",getLogin);
router.get("/register",getRegister);

//router.get("/dashboard", getDashboard);

//router.route("/").all(isUser).get(getLogin).post(postRegister);

module.exports = router;