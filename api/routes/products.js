const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // This is not working on Windows. For Windows, check the line after the commented one
    // cb(null, new Date().toISOString() + file.originalname);
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/products');

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter
});

router.get("/", productController.getProducts);

router.post("/", checkAuth, upload.single("productImage"), );

router.get("/:productId", productController.getSingleProduct);

router.patch("/:productId", checkAuth, productController.updateProduct);

router.delete("/:productId", checkAuth, productController.deleteProduct);

module.exports = router;
