const isAuthenticated = require("../middleware/isAuthenticated");
const Valuation = require("../models/Valuation.model");
const router = require("express").Router();

//GET "/valuation/:gameId" =>Get all game valuation
router.get("/:gameId", isAuthenticated, async (req, res, next) => {
  try {
    const allValuations = await Valuation.find({
      gameId: { $in: [req.params.gameId] },
    });
    res.json(allValuations);
  } catch (error) {
    next(error);
  }
});

//POST "/valuation/:gameId" => Create a new valuation
router.post("/:gameId", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const { content, value } = req.body;
    await Valuation.create({
      owner: userId,
      gameId: req.params.gameId,
      content,
      value,
    });
    res.json("Valuation created");
  } catch (error) {
    next(error);
  }
});
//DELETE "/valuation/:valuationId" => Delete a valuation
router.delete("/:valuationId", isAuthenticated, async (req, res, next) => {
  try {
    await Valuation.findByIdAndDelete(req.params.valuationId);
    res.json("Valuation deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
