const express = require("express");
const router = express.Router();
const {
  getBootcamps,
  createBootcamps,
  updateBootcamps,
  getBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamps");

router.route("/").get(getBootcamps).post(createBootcamps);

router
  .route("/:id")
  .put(updateBootcamps)
  .get(getBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
