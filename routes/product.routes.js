const express = require("express");
const router = express.Router();
const {
  createProduct,
  displayProduct,
} = require("../controllers/product.controllers");
const {isAuthenticated, isAdmin} = require("../middlewares/auth");

router.post("/product/create", isAuthenticated, isAdmin, createProduct);
router.get("/products/all", displayProduct);

module.exports = router;
