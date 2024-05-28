const router = require("express").Router();

router.use("/", require("./swagger.routes"));
router.use("/api", require("./auth.routes"));

module.exports = router;
