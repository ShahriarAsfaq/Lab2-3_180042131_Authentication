  
const getRegister = (req, res) => {
    res.sendFile("register-v2.html", { root: "./AdminLTE-master/pages/examples" });
  };
  
  const postRegister = (req, res) => {
    res.redirect("/dashboard");
  };
  
  const getLogin = (req, res) => {
    res.sendFile("login-v2.html", { root: "./AdminLTE-master/pages/examples" });
   // const { id, username } = req.query;
    //res.send(
   //   `user with ID - ${id} and Username - ${username} is requesting to login.`
    //);
  };
  
  /*const getDashboard = (req, res) => {
    //res.send(`User Dashboard`);
    res.sendFile("index.html", { root: "./AdminLTE-master" });
  };
  */
  module.exports = { getRegister, postRegister, getLogin};