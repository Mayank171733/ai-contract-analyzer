const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  uploadContract,
} = require("../controllers/contractController");


router.post(
  "/upload",
  protect,
  upload.single("contract"),
  uploadContract
);


module.exports = router;