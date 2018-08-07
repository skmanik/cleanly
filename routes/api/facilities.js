const router = require("express").Router();
const facilitiesController = require("../../controllers/facilitiesController");

// Matches with "/api/facilities"
router.route("/")
  .get(facilitiesController.findAll)
  .post(facilitiesController.saveComment);

// Matches with "/api/facilities/:id"
router
  .route("/:id")
  .get(facilitiesController.findById);

  router
  .route("/comment/:idFacility")
  .get(facilitiesController.findCommentByFacility);

router
  .route("/name/:name/id/:id")
  .get(facilitiesController.findByName);

router
  .route("/photo/:name")
  .get(facilitiesController.findPhotoByName)

module.exports = router;