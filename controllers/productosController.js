const productsModel = require("../models/productosModel");

const getAll = async function(req, res, next) {
  try {
    console.log(req.query)
    const documents = await productsModel.find()
    .populate({
      path:"category",
      select:"name"
    })
    res.json(documents)
  } catch (error) {
    console.log(error)
  }
  };


const getById = async function(req, res, next) {
  try {
    console.log(req.params.id)
    const document = await productsModel.findById(req.params.id)
    res.json(document)
  } catch (error) {
    console.log(error)
    res.json("No se encontro el producto")
  }
  };

const create = async function(req, res, next) {
    try {
      const producto = new productsModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        quantity: req.body.quantity,
        category: req.body.category,
        code: req.body.category
      })
      const document = await producto.save()
      res.json(document)
    } catch (error) {
      return res.json(error.message)
    }
  };

const update = async function(req, res, next) {
  try {
    const document = await productsModel.updateOne({_id:req.params.id}, req.body)
    res.json(document)
  } catch (error) {
    console.log(error)
    res.json("ERROR, NO SE ENCONTRO EL PRODUCTO A MODIFICAR")
  }
};

const deleteProduct = async function (req, res , next) {
  try {
    const document = await productsModel.deleteOne({_id: req.params.id})
    res.json(document)
    } catch (error) {
    console.log(error)
    res.json("ERROR, NO SE ENCONTRO EL ARCHIVO A ELMINAR")
  }
}



  module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteProduct
  };