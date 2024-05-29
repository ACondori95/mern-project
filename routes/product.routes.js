const express = require("express");
const router = express.Router();
const {
  createProduct,
  displayProduct,
  updateProduct,
  deleteProduct,
  productCategory,
} = require("../controllers/product.controllers");
const {isAuthenticated, isAdmin} = require("../middlewares/auth");

router.post("/product/create", isAuthenticated, isAdmin, createProduct);
router.get("/products/all", displayProduct);
router.put("/product/update/:id", isAuthenticated, isAdmin, updateProduct);
router.delete("/product/delete/:id", isAuthenticated, isAdmin, deleteProduct);
router.get("/product/categories", productCategory);

module.exports = router;
