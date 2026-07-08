const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    analyze
}=require("../controllers/analysisController");


router.post(
    "/:contractId",
    protect,
    analyze
);


module.exports=router;