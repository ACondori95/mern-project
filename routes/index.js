const router = require("express").Router();

router.use("/", require("./swagger.routes"));
router.use("/", require("./user.routes"));

module.exports = router;
