var express = require('express');
const usersController = require('../controllers/usersController');
var router = express.Router();

router.post("/register", usersController.create)
router.post("/login", usersController.login)


module.exports = router
