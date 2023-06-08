const isAuthenticated = require("../middleware/isAuthenticated");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

const router = require("express").Router();

//GET "/user" => user info
router.get("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const activeUser = await User.findById(userId).populate("friends");

     //changing the date format 
     const userClone = JSON.parse(JSON.stringify(activeUser));
     let newDate = new Date(userClone.birthDate).toDateString();
     userClone.birthDate = newDate
     console.log(userClone)

    res.json(userClone);
  } catch (error) {
    next(error);
  }
});

//GET "/user/:friendId" => user's friend info

router.get("/:friendId", isAuthenticated, async (req, res, next) => {
  try {
    const friend = await User.findById(req.params.friendId);
    res.json(friend);
  } catch (error) {
    next(error);
  }
});

//GET "/user/:queryFriend/find" => user's friend info

router.get("/:queryFriend/find", isAuthenticated, async (req, res, next) => {
  try {

    const friend = await User.findOne({username: req.params.queryFriend});
    console.log(friend)

    //User not found
    if(!friend){
      res.status(400).json({ errorMessage: "Username not found" });
      return;
    }

    res.json(friend);
  } catch (error) {
    next(error);
  }
});

//PUT "/user/edit" => edit user info
router.put("/edit", isAuthenticated, async (req, res, next) => {
  
  const userId = req.payload._id;
  try {
    const {
      username,
      pastPassword,
      newPassword,
      firstName,
      lastName,
      birthDate,
      email,
      phoneNumber,
      profileImg,
    } = req.body;
    const activeUser = await User.findById(userId);

    // Checking the old password
    const isPasswordCorrect = await bcrypt.compare(
      pastPassword,
      activeUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ errorMessage: "Password is not correct" });
      return;
    }

    //Encrypt the new password
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    //Update the user
    await User.findByIdAndUpdate(userId, {
      username,
      password: hashPassword,
      firstName,
      lastName,
      birthDate,
      email,
      phoneNumber,
      profileImg,
    });
    res.json("User updated");
  } catch (error) {
    next(error);
  }
});

//PATCH "/user/add-friend/:friendId" => add a friend
router.patch(
  "/add-friend/:friendId",
  isAuthenticated,
  async (req, res, next) => {
    const userId = req.payload._id;
    try {
      await User.findByIdAndUpdate(userId, { $push: { friends: req.params.friendId } });
      await User.findByIdAndUpdate(req.params.friendId, { $push: { friends: userId } });
      res.json("Friend added");
    } catch (error) {
      next(error);
    }
  }
);

//PATCH "/user/friends/:friendId" => delete a friend
router.patch("/friends/:friendId", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const friend = await User.findById(req.params.friendId);
    await User.findByIdAndUpdate(userId, { $pull: { friends: friend._id } });
    res.json("Friend deleted from the list");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
