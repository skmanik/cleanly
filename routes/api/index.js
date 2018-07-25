const router = require("express").Router();
const facilitiesRoutes = require("./facilities");

// Book routes
router.use("/facilities", facilitiesRoutes);

module.exports = router;