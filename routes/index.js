const router = require("express").Router();

router.use("/", require("./swagger.routes"));
router.use("/api", require("./user.routes"));

module.exports = router;
