const express = require('express')
const router = express.Router()
const {register, login, logout} = require('../controllers/auth')
const auth = require('../middleware/auth')


router.route('/register').post(register)
router.route('/login').get(login)
router.route('/logout').get(auth, logout)

module.exports = router


