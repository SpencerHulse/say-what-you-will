const router = require("express").Router();
const apiRoutes = require("./api/index");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);

// Catches any other routes
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
