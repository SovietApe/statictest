var express = require('express');
var router = express.Router();
const productosController = require("../controllers/productosController")

/* GET productos listing. */ 
router.get("/", productosController.getAll);

// pedido de objeto por su ID
router.get("/:id", productosController.getById)

// crear un producto 
router.post("/", (req,res,next)=>{req.app.verifyToken(req,res,next)} ,productosController.create);

// actualizar un producto
router.put("/:id", productosController.update)

// eliminar un producto 
router.delete("/:id",(req,res,next)=>{req.app.verifyToken(req,res,next)} , productosController.deleteProduct)

module.exports = router;
