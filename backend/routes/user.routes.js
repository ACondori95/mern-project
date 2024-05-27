const express = require("express");
const router = express.Router();
const {sayHello} = require("../controllers/user.controllers");

router.get("/", sayHello);

module.exports = router;
