const express = require("express");
const router = express.Router();
const {createProduct} = require("../controllers/product.controllers");

router.post("/product/create", createProduct);

module.exports = router;
