const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");


const {
    uploadContract,
    getContracts,
    getContract,
    deleteContract
}=require("../controllers/contractController");


// Upload
router.post(
    "/upload",
    protect,
    upload.single("contract"),
    uploadContract
);


// Get all contracts
router.get(
    "/",
    protect,
    getContracts
);


// Get one contract
router.get(
    "/:id",
    protect,
    getContract
);


// Delete contract
router.delete(
    "/:id",
    protect,
    deleteContract
);


module.exports = router;