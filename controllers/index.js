const router = require("express").Router();
const homeRoutes = require("./home-routes");
const apiRoutes = require("./api/index");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

// Catches any other routes
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
