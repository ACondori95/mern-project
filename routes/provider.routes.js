const express = require("express");
const router = express.Router();
const {
  createProvider,
  getProviders,
  updateProvider,
  deleteProvider,
} = require("../controllers/provider.controllers");
const {isAuthenticated, isAdmin} = require("../middlewares/auth");

router.post("/provider/create", isAuthenticated, isAdmin, createProvider);
router.get("/provider/all", getProviders);
router.put("/provider/update/:id", isAuthenticated, isAdmin, updateProvider);
router.delete("/provider/delete/:id", isAuthenticated, isAdmin, deleteProvider);

module.exports = router;
