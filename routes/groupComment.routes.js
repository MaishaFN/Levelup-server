const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const GroupComment = require("../models/GroupComment.model");

//GET "/group-comment/:groupId" => get all user's group comments
router.get("/:groupId", async (req, res, next) => {
  try {
    const groupComments = await GroupComment.find({group:req.params.groupId}).populate("owner");
    res.json(groupComments);
  } catch (error) {
    next(error);
  }
});

//POST "/group-comment/:groupId" => create a new group comment
router.post("/:groupId", isAuthenticated, async (req, res, next) => {
    const userId = req.payload._id;
    try {
        const { content } = req.body;
        await GroupComment.create({ owner: userId, group: req.params.groupId, content });
        res.json("Group comment created");
    } catch (error) {
        next(error);
    }
});

//DELETE "/group-comment/:groupCommentId" => delete a group comment
router.delete("/:groupCommentId", async (req, res, next) => {
    try {
        await GroupComment.findByIdAndDelete(req.params.groupCommentId);
        res.json("Group comment delete");
    } catch (error) {
        next(error);
    }
});

//PATCH "/group-comment/:groupCommentId/handle-like" => push/pull a new reaction to the comment
router.patch("/:groupCommentId/handle-like", isAuthenticated, async (req, res, next) =>{
  const userId = req.payload._id;
  try {

    //checking if the user already did a reaction
    const foundGroupComment = await GroupComment.findById(req.params.groupCommentId);
    if(foundGroupComment.likes.includes(userId)) {
      await GroupComment.findByIdAndUpdate(req.params.groupCommentId, {$pull: { likes: userId}});
      res.json("Reaction deleted");
      return;
    }

      await GroupComment.findByIdAndUpdate(req.params.groupCommentId, {$push: { likes: userId}});
      res.json("Reaction added");
    } catch (error) {
        next(error);
    }
});


//PATCH "/group-comment/:groupCommentId/handle-love" => push/pull a new reaction to the comment
router.patch("/:groupCommentId/handle-love", isAuthenticated, async (req, res, next) =>{
    const userId = req.payload._id;
    try {

      //checking if the user already did a reaction
      const foundGroupComment = await GroupComment.findById(req.params.groupCommentId);
      if(foundGroupComment.loves.includes(userId)) {
        await GroupComment.findByIdAndUpdate(req.params.groupCommentId, {$pull: { loves: userId}});
        res.json("Reaction deleted");
        return;

      }

      await GroupComment.findByIdAndUpdate(req.params.groupCommentId, {$push: { loves: userId}});
      res.json("Reaction added");
    } catch (error) {
        next(error);
    }
});

//PATCH "/group-comment/:groupCommentId/handle-dislike" => push a new reaction to the comment
router.patch("/:groupCommentId/handle-dislike", isAuthenticated, async (req, res, next) =>{
    const userId = req.payload._id;
    try {

      //checking if the user already did a reaction
      const foundGroupComment = await GroupComment.findById(req.params.groupCommentId);
      if(foundGroupComment.dislikes.includes(userId)) {
        await GroupComment.findByIdAndUpdate(req.params.groupCommentId, {$pull: { dislikes: userId}});
        res.json("Reaction deleted");
        return;
      } 
  
      await GroupComment.findByIdAndUpdate(req.params.groupCommentId, {$push: { dislikes: userId}});
      res.json("Reaction added");
    } catch (error) {
        next(error);
    }
});

module.exports = router;