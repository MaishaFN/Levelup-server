const isAuthenticated = require("../middleware/isAuthenticated");
const User = require("../models/User.model");
const Group = require("../models/Group.model");
const router = require("express").Router();

//GET "/group"=> Get all groups where the user is included
router.get("/", isAuthenticated, async (req, res, next) => {
  console.log(req.payload);
  const userId = req.payload._id;
  try {
    const activeUser = await User.findById(userId);
    const groups = await Group.find();
    res.json(groups.filter(groups.participants.includes(activeUser)));
  } catch (error) {
    next(error);
  }
});
//GET "/group/own" => Get all groups where the user is owner
router.get("/own", isAuthenticated, async (req, res, next) => {
  console.log(req.payload);
  const userId = req.payload._id;
  try {
    const activeUser = await User.findById(userId);
    const groups = await Group.find();
    res.json(groups.filter(groups.owner.includes(activeUser)));
  } catch (error) {
    next(error);
  }
});
//GET "/group/:groupId/details" => Get group details
router.get("/:groupId/details", isAuthenticated, async (req, res, next) => {
  console.log(req.payload);
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
    const { name, mods, participants } = req.body;
    //!CONDICIONAL!
    const newGroup = await Group.create({
      name,
      owner: userId,
      mods,
      participants,
    });
    res.json(newGroup);
  } catch (error) {
    next(error);
  }
});

//PATCH "/group/:groupId/:userId/delete-user" => Delete a user from a group
router.patch(
  "/:groupId/:userId/delete-user",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const group = Group.findById(req.params.groupId);
      const deleteUser = await User.findById(req.params.userId);
      await Group.findByIdAndUpdate(group._id, {
        $pull: { participants: deleteUser._id },
      });
      res.json("User deleted from the list");
    } catch (error) {
      next(error);
    }
  }
);

//PATCH "/group/:groupId/:modId/addmod" => Add a mod to the group
router.patch(
  "/:groupId/:modId/addmod",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const group = Group.findById(req.params.groupId);
      const addMod = await User.findById(req.params.modId);
      await Group.findByIdAndUpdate(group._id, {
        $push: { participants: addMod._id },
      });
      res.json("Moderator added");
    } catch (error) {
      next(error);
    }
  }
);
//PATCH "/group/:groupId/:modId/deleteMod" => Delete a mod to the group
router.patch(
  "/:groupId/:modId/deleteMod",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const group = Group.findById(req.params.groupId);
      const addMod = await User.findById(req.params.modId);
      await Group.findByIdAndUpdate(group._id, {
        $pull: { participants: addMod._id },
      });
      res.json("Moderator delete");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
