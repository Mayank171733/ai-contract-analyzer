const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  analyze,
  getAnalysis,
} = require("../controllers/analysisController");


router.post(
  "/:contractId",
  protect,
  analyze
);

router.get(
  "/:contractId",
  protect,
  getAnalysis
);

module.exports = router;