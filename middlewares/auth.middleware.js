
const isUser = (req, res, next) => {
    if (req.method == "POST") {
      const username = req.body.username;
      const email = req.body.email;
      if (username == "admin") {
        next();
      } else {
        res.redirect("/login");
      }
    } else {
      next();
    }
  };
  
  module.exports = isUser;