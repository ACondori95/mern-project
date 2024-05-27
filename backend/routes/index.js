const router = require("express").Router();

router.use("/api", require("./user.routes"));

module.exports = router;
