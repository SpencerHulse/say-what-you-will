const router = require("express").Router();
const { User } = require("../../models/index");

router.get("/", (req, res) => {
  res.json({ success: true, message: "received" });
});

module.exports = router;
