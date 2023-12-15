const express = require("express");
const router = express.Router();
const {
  getBootcamps,
  createBootcamps,
  updateBootcamps,
  getBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamps");

const auth = require('../middleware/auth')

router.route("/").get(auth, getBootcamps).post(auth, createBootcamps);

router
  .route("/:id")
  .put(auth, updateBootcamps)
  .get(auth, getBootcamp)
  .delete(auth, deleteBootcamp);

module.exports = router;
