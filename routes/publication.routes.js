const isAuthenticated = require("../middleware/isAuthenticated");
const Publication = require("../models/Publication.model");
const User = require("../models/User.model");

const router = require("express").Router();

//GET "/publication" => get all user's publications
router.get("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const publications = await Publication.find({ owner: { $in: [userId] } }).populate("owner").limit(20).sort({createdAt : -1});
    const publicationClone = publications.map(publication => {
      console.log(publication.createdAt)
      const cloneDate = publication.createdAt
      let newDate = cloneDate.toTimeString() + cloneDate.toDateString();
      publication.createdAt = newDate
      console.log(publication.createdAt)
      return publication;
    });
    res.json(publicationClone);
  } catch (error) {
    next(error);
  }
});

//POST "/publication" => create a new publication
router.post("/", isAuthenticated, async (req, res, next) => {
    const userId = req.payload._id;
    try {
        const { content } = req.body;
        await Publication.create({ owner: userId, content });
        res.json("Publication created");
    } catch (error) {
        next(error);
    }
});

//GET "/publication/friendList" =>  get friends publications
router.get("/friendList", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const userActive = await User.findById(userId);
    const friendList = userActive.friends;
    const publicationList = await Publication.find({owner: { $in: friendList }}).populate("owner");
    publicationList.forEach((publication) => {
      const publicationDate = publication.createdAt;
      publication.createdAt = new Date(publicationDate).toTimeString().slice(0,8) + " - " + new Date(publicationDate).toDateString();
    });

    res.json(publicationList);
  } catch (error) {}
});

//DELETE "/publication/:publicationId" => delete a publication
router.delete("/:publicationId", async (req, res, next) => {
  try {
    await Publication.findByIdAndDelete(req.params.publicationId);
    res.json("Publication deleted");
  } catch (error) {
    next(error);
  }
});

//PATCH "/publication/:publicationId/handle-like" => push/pull a new reaction to the publication
router.patch("/:publicationId/handle-like", isAuthenticated, async (req, res, next) =>{
  const userId = req.payload._id;
  try {

    //checking if the user already did a reaction and deleting in that case
    const publication = await Publication.findById(req.params.publicationId);
    console.log(publication)
    if(publication.likes.includes(userId)) {
     await Publication.findByIdAndUpdate(req.params.publicationId, {$pull: { likes: userId}});;
      res.json("Reaction deleted");
      return;
    }

    await Publication.findByIdAndUpdate(req.params.publicationId, {$push: { likes: userId}});
    res.json("Reaction added");
  } catch (error) {
      next(error);
  }
});

//PATCH "/publication/:publicationId/handle-love" => push a new reaction to the publication
router.patch("/:publicationId/handle-love", isAuthenticated, async (req, res, next) =>{
  const userId = req.payload._id;
  try {

    //checking if the user already did a reaction and deleting in that case
    const publication = await Publication.findById(req.params.publicationId);
    if(publication.loves.includes(userId)) {
      await Publication.findByIdAndUpdate(req.params.publicationId, {$pull: { loves: userId}});
      res.json("Reaction deleted");
      return;
    };

    await Publication.findByIdAndUpdate(req.params.publicationId, {$push: { loves: userId}});
    res.json("Reaction added");
  } catch (error) {
      next(error);
  }
});

//PATCH "/publication/:publicationId/handle-dislike" => push a new reaction to the publication
router.patch("/:publicationId/handle-dislike", isAuthenticated, async (req, res, next) =>{
  const userId = req.payload._id;
  try {

    //checking if the user already did a reaction and deleting in that case
    const publication = await Publication.findById(req.params.publicationId);
    if(publication.dislikes.includes(userId)) {
      await Publication.findByIdAndUpdate(req.params.publicationId, {$pull: { dislikes: userId}});
      res.json("Reaction deleted");
      return;
    };

    await Publication.findByIdAndUpdate(req.params.publicationId, {$push: { dislikes: userId}});
    res.json("Reaction added");
  } catch (error) {
      next(error);
  }
});


module.exports = router;
