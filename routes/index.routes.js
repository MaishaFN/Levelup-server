const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));
router.use("/group", require("./group.routes"));
router.use("/publication", require("./publication.routes"));
router.use("/valuation", require("./valuation.routes"));
router.use("/games", require("./games.routes"));
router.use("/admin", require("./admin.routes"));




 

module.exports = router;
