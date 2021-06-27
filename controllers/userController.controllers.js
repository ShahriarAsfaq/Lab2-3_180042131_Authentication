  
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
    
    res.redirect("/dashboard");
  };
  
  const getDashboard = (req, res) => {
    //res.send(`User Dashboard`);
    res.sendFile("index.html", { root: "./AdminLTE-master" });
  };
  
  module.exports = { getRegister, postRegister, getLogin, postLogin, getDashboard};