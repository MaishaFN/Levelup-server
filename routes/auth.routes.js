const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User.model.js");
const bcrypt = require ("bcryptjs")
const isAuthenticated = require("../middleware/isAuthenticated")
//POST "/api/auth/signup"
router.post("/signup", async (req, res, next) => {
  const { username, password, confirmPass, firstName, lastName } = req.body;
  const regexPattern =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  //! Username and password filled
  if (!username || !password) {
    res
      .status(404)
      .json({ errorMessage: "Please enter username and password" });
    return;
  }
  try {
    //!Username already exists
    const foundUser = await User.findOne({ username: username });
    if (foundUser) {
      res.status(404).json({ errorMessage: "Username is already in use" });
      return;
    }
    //! Confirm password
    if(password !== confirmPass) {
        res.status(404).json({ errorMessage: "Password is not the same"})
        return
    }
    //! Checking if password is safe
    if (regexPattern.test(password) === false) {
      res.status(404).json({errorMessage: "The code of honour must be more intricate."});
      return;
    }
    //! Encrypt Password
    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)
    const user = await User.create({username, password:hashPassword, firstName, lastName})
    res.json(user)
  } catch (error) {
    next(error);
  }
});

//POST "/api/auth/login"
router.post("/login", async (req, res, next)=>{
  const {username, password}= req.body
  try {
    //! Username not Registered
  const foundUser = await User.findOne({username:username})
    if (!foundUser){
      res.status(404).json({errorMessage: "Username is not registered"})
      return;
    }
    //! Password is not correct
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    if(!isPasswordCorrect){
      res.status(404).json({errorMessage: "Password is not correct"})
      return;
    }
    //! Token Creation and Auth
    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
      rol: foundUser.rol
    }
    
    const authToken =  jwt.sign(payload, process.env.TOKEN_SECRET, {algorithm: "HS256",expiresIn: "7d"})
    res.json({authToken})
  } catch (error) {next(error)}
})

// GET
  router.get ("/verify", isAuthenticated, (req, res, next)=>{
    res.json(req.payload)
  })
module.exports = router;
