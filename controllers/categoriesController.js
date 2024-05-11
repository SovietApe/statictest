const { response } = require("../app")
const categoriesModel = require("../models/categoriesModel")

module.exports={
    getAll: async function(req, res , next){
        try {
            const productos = await categoriesModel.find()
            res.json(productos)
        } catch (error) {
            next(error)
        }
    },
    create: async function(req,res,next){
        try {
            console.log(req.body)
            console.log(req.body.name)
            const document = new categoriesModel({
                name: req.body.name
            })
            const response = await document.save()

            res.json(response)

        } catch (error) {
            //e.status=200
            next(error)
        }
    },
    getById: async function(req,res,next){
        try {
            console.log(req.params.id)
            const document = await categoriesModel.findById(req.params.id)
            console.log(document)
            console.log(document.name)
            res.json(document.name)
        } catch (error) {
            next(error)
        }
   }
}