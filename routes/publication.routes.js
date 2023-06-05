const isAuthenticated = require("../middleware/isAuthenticated");
const Publication = require("../models/Publication.model");
const User = require("../models/User.model");

const router = require("express").Router();

//GET "/publication" => get all user's publications
router.get("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const publications = await Publication.find({ owner: { $in: [userId] } }).populate("owner");
    res.json(publications);
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
    const friendList = userActive.friends
    let publicationList = [];

    // Find all friends publications
    for (let i = 0; i < friendList.length; i++){
        try {
            const friend = friendList[i];
            const friendPublication = await Publication.find({owner: { $in: [friend] }}).populate("owner");
            if (friendPublication.length > 0){
                publicationList = [...publicationList, ...friendPublication]
            } else {
                publicationList = [...publicationList, friendPublication]
            }     
        } catch (error) {
            next(error)
        }
    }
    
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
    const publication = await Publication.findById(req.params.valuationId);
    if(publication.likes.includes(userId)) {
     await Publication.findByIdAndUpdate(req.params.valuationId, {$pull: { likes: userId}});;
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
    const publication = await Publication.findById(req.params.valuationId);
    if(publication.loves.includes(userId)) {
      await Publication.findByIdAndUpdate(req.params.valuationId, {$pull: { loves: userId}});
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
    const publication = await Publication.findById(req.params.valuationId);
    if(publication.dislikes.includes(userId)) {
      await Publication.findByIdAndUpdate(req.params.valuationId, {$pull: { dislikes: userId}});
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
