const User = require("../models/User.model");
const Group = require("../models/Group.model");
const router = require("express").Router();


// GET "/admin/users" => Get all users
router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users); 
  } catch (error) {
    next(error); 
  }
});

//DELETE "/admin/:userId" => Delete an user
router.delete("/:userId", async (req, res, next)=>{
try {
    await User.findByIdAndDelete(req.params.userId)
    res.json ("User deleted")
} catch (error) {next(error)}    
    
})


//GET "/admin/groups" => Get all groups
router.get("/groups", async (req, res, next) => {
    try {
      const group = await Group.find();
      res.json(group); 
    } catch (error) {next(error)}
  });



//DELETE "/admin/group/:groupId" => Delete an groups
router.delete("/group/:groupId", async (req, res, next)=>{
    try {
        await Group.findByIdAndDelete(req.params.groupId)
        res.json ("Group deleted")
    } catch (error) {next(error)}       
    })
module.exports = router;
