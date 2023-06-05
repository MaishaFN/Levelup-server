const router = require("express").Router();
const uploader = require("../middleware/cloudinary.config")

// POST "/upload" => upload images to cloudinary
router.post("/", uploader.single("image"), (req, res, next) => {
  
    if (!req.file) {
      next("No file uploaded!");
      return;
    }
    
    res.json({ imageUrl: req.file.path });
  });


module.exports = router;
