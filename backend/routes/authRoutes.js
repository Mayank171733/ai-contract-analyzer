const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  registerUser,
  loginUser,
  updateProfile,
  updateProfilePhoto,
  updatePassword,
} = require("../controllers/authController.js");
const protect = require("../middleware/authMiddleware.js");

const uploadDir = path.join(__dirname, "..", "uploads", "profile-photos");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".png";
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp"];
    const isImageMime = file.mimetype && file.mimetype.startsWith("image/");
    const isAllowedExtension = allowedExtensions.includes(ext);

    if (isImageMime || isAllowedExtension) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/profile", protect, updateProfile);
router.patch("/profile/photo", protect, upload.single("photo"), updateProfilePhoto);
router.patch("/profile/password", protect, updatePassword);

module.exports = router;