const router = require("express").Router();

router.use("/", require("./swagger.routes"));
router.use("/api", require("./auth.routes"));
router.use("/api", require("./product.routes"));
router.use("/api", require("./category.routes"));

module.exports = router;
