var express = require("express")
const categoriesController = require("../controllers/categoriesController")
var router = express.Router()

router.get('/', categoriesController.getAll);

router.post('/', (req,res,next)=>{req.app.verifyToken(req,res,next)} ,categoriesController.create)

router.get("/:id", categoriesController.getById)

module.exports = router; 
