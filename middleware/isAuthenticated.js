const { expressjwt: jwt } = require("express-jwt");

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: (req) => {
    if (!req.headers || !req.headers.authorization) {
      console.log("There is no token");
      return null;
    }
    const tokenArr = req.headers.authorization.split(" ");
    const tokenType = tokenArr[0];
    const token = tokenArr[1];
    
    if (tokenType == !"Bearer") {
      console.log("Token incorrect");
      return null;
    } 
    
    console.log("Token delivered");
    return token;
  },
});

module.exports = isAuthenticated;
