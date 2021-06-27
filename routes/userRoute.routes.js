const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const isUser = require("./../middlewares/auth.middleware");
const isRegistretionOk = require("./../middlewares/auth.middleware");
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

router.get("/dashboard", getDashboard);


router.route("/register").all(isRegistretionOk).get(getRegister).post(postRegister);
router.route("/login").all(isUser).get(getLogin).post(postLogin);

module.exports = router;