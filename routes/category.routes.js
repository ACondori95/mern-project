const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controllers");
const {isAuthenticated, isAdmin} = require("../middlewares/auth");

router.post("/category/create", createCategory);
router.get("/category/all", getCategories);
router.put("/category/update/:id", isAuthenticated, isAdmin, updateCategory);
router.delete("/category/delete/:id", isAuthenticated, isAdmin, deleteCategory);

module.exports = router;
