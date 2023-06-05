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
        await GroupComment.findByIdAndDelete(groupCommentId);
        res.json("Group comment delete");
    } catch (error) {
        next(error);
    }
});

//PATCH "/group-comment/:groupCommentId/add-like" => push a new reaction to the comment
router.patch("/:groupCommentId/add-like", isAuthenticated, async (req, res, next) =>{
    const userId = req.payload._id;
    try {
      await GroupComment.findByIdAndUpdate(req.params.groupCommentId, {$push: { likes: userId}});
      res.json("Reaction added");
    } catch (error) {
        next(error);
    }
});

//PATCH "/group-comment/:groupCommentId/delete-like" => pull a reaction from the comment
router.patch("/:groupCommentId/delete-like", isAuthenticated, async (req, res, next) =>{
    const userId = req.payload._id;
    try {
      await GroupComment.findByIdAndUpdate(req.params.groupCommentId, {$pull: { likes: userId}});
      res.json("Reaction deleted");
    } catch (error) {
        next(error);
    }
});

//PATCH "/group-comment/:groupCommentId/add-love" => push a new reaction to the comment
router.patch("/:groupCommentId/add-like", isAuthenticated, async (req, res, next) =>{
    const userId = req.payload._id;
    try {
      await GroupComment.findByIdAndUpdate(req.params.groupCommentId, {$push: { loves: userId}});
      res.json("Reaction added");
    } catch (error) {
        next(error);
    }
});

//PATCH "/group-comment/:groupCommentId/delete-love" => pull a reaction from the comment
router.patch("/:groupCommentId/delete-love", isAuthenticated, async (req, res, next) =>{
    const userId = req.payload._id;
    try {
      await GroupComment.findByIdAndUpdate(req.params.groupCommentId, {$pull: { loves: userId}});
      res.json("Reaction deleted");
    } catch (error) {
        next(error);
    }
});

//PATCH "/group-comment/:groupCommentId/add-dislike" => push a new reaction to the comment
router.patch("/:groupCommentId/dislike-like", isAuthenticated, async (req, res, next) =>{
    const userId = req.payload._id;
    try {
      await GroupComment.findByIdAndUpdate(req.params.groupCommentId, {$push: { dislikes: userId}});
      res.json("Reaction added");
    } catch (error) {
        next(error);
    }
});

//PATCH "/group-comment/:groupCommentId/add-dislike" => pull a reaction from the comment
router.patch("/:groupCommentId/dislike-like", isAuthenticated, async (req, res, next) =>{
    const userId = req.payload._id;
    try {
      await GroupComment.findByIdAndUpdate(req.params.groupCommentId, {$pull: { dislikes: userId}});
      res.json("Reaction deleted");
    } catch (error) {
        next(error);
    }
});

module.exports = router;