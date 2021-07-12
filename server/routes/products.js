const router = require("express").Router();
const multer = require("multer");
const {
  getAllProducts,
  getProductsByCategory,
  addProduct,
  deleteProduct,
  getAllCategories,
  getProduct,
} = require("../controller/productController");
const authorize = require("../middleware/authorize");

// configure multer
const upload = multer({ dest: "./public/imgs" });

// GET ALL PRODUCTS => /products/?page=1&limit=10
router.get("/", getAllProducts);

// GET SPECIFIC PRODUCTS BY 'category'
router.get("/specific", getProductsByCategory);

router.get("/single", getProduct);

router.post("/add", authorize, upload.single("image"), addProduct);

router.delete("/delete/:id", authorize, deleteProduct);

router.get("/categories", getAllCategories);

module.exports = router;
