const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Absolute path to public/images
const dir = path.join(__dirname, "../public/images");

// Ensure the folder exists
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) => {
    // Keep original file name
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
