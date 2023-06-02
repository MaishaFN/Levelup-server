const isAuthenticated = require("../middleware/isAuthenticated");
const User = require("../models/User.model");
const Group = require("../models/Group.model");
const router = require("express").Router();

//GET "/group"=> Get all groups where the user is included
router.get("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    await User.findById(userId);
    const groups = await Group.find({ participants: { $in: [userId]  } }).populate("participants");
    res.json(groups);
  } catch (error) {
    next(error);
  }
});
//GET "/group/own" => Get all groups where the user is owner
router.get("/own", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    await User.findById(userId);
    const groups = await Group.find({ owner: { $in: [userId] } }).populate("participants");
    res.json(groups);
  } catch (error) {
    next(error);
  }
});
//GET "/group/:groupId/details" => Get group details
router.get("/:groupId/details", async (req, res, next) => {
  try {
    const groupDetails = await Group.findById(req.params.groupId);
    res.json(groupDetails);
  } catch (error) {
    next(error);
  }
});

//POST "/group/create" => Create a group
router.post("/create", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const { name } = req.body;

    //Checking if the name is included
    if (!name) {
      res
        .status(404)
        .json({ errorMessage: "You should put a name to the group" });
      return;
    }
    const newGroup = await Group.create({
      name,
      owner: userId,
    });
    res.json(newGroup);
  } catch (error) {
    next(error);
  }
});
//PATCH "/group/:groupId/:userId/add-user" => Add a user to group
router.patch("/:groupId/:userId/add-user", async (req, res, next) => {
    try {
      await Group.findByIdAndUpdate(req.params.groupId, {$push: { participants: req.params.userId}});
      res.json("User added to the list");
    } catch (error) {
      next(error);
    }
  }
);

//PATCH "/group/:groupId/:userId/delete-user" => Delete a user from a group
router.patch("/:groupId/:userId/delete-user", async (req, res, next) => {
    try {
      await Group.findByIdAndUpdate(req.params.groupId, {$pull: { participants: req.params.userId}});
      res.json("User deleted from the list");
    } catch (error) {
      next(error);
    }
  }
);

//PATCH "/group/:groupId/:modId/add-mod" => Add a mod to the group
router.patch("/:groupId/:modId/add-mod", isAuthenticated, async (req, res, next) => {
    try {  
      await Group.findByIdAndUpdate(req.params.groupId, {$push: { mods: req.params.modId}});
      res.json("Moderator added");
    } catch (error) {
      next(error);
    }
  }
);
//PATCH "/group/:groupId/:modId/delete-mod" => Delete a mod to the group
router.patch("/:groupId/:modId/delete-mod", isAuthenticated, async (req, res, next) => {
    try {

      await Group.findByIdAndUpdate(req.params.groupId, {$pull: { mods: req.params.modId }});
      res.json("Moderator delete");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
