const router = require("express").Router();
const facilitiesController = require("../../controllers/facilitiesController");

// Matches with "/api/facilities"
router.route("/")
  .get(facilitiesController.findAll);

// Matches with "/api/facilities/:id"
router
  .route("/:id")
  .get(facilitiesController.findById);
  

module.exports = router;