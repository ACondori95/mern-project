const express = require("express");
const router = express.Router();
const {
  createProvider,
  getProviders,
  updateProvider,
  deleteProvider,
} = require("../controllers/provider.controllers");

router.post("/provider/create", createProvider);
router.get("/provider/all", getProviders);
router.put("/provider/update/:id", updateProvider);
router.delete("/provider/delete/:id", deleteProvider);

module.exports = router;
