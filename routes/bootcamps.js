const express = require("express");
const router = express.Router();
const {getBootcamps, createBootcamps, updateBootcamps} = require('../controllers/bootcamps')


router.route('/')
.get(getBootcamps)
.post(createBootcamps)

router.route('/:id')
.put(updateBootcamps)

module.exports = router