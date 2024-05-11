const { response } = require("../app")
const UsersModel = require("../models/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const emailvalidator = require("email-validator");
module.exports={
    getAll: async function(req, res , next){
        try {
            const usuarios = await UsersModel.find()
            res.json(usuarios)
        } catch (error) {
            next(error)
        }
    },
    create: async function(req,res,next){
        try {
            if(!req.body.password || !req.body.email || !req.body.name){
                console.log("faltan datos")
                    res.json({message:"Faltan datos"})
             }else{
                if(emailvalidator.validate(req.body.email)){
                    const validation = await UsersModel.findOne({email: req.body.email})
                    if(validation !== null){
                        res.json({message:"Este Email ya se encuentra en uso"})
                    }else{
                            console.log(req.body)
                            console.log(req.body.name)
                            const document = new UsersModel({
                                name: req.body.name,
                                surname: req.body.surname,
                                email: req.body.email,
                                password: req.body.password
                        })
                        const response = await document.save()
                        res.json(response)
                        
                    }                    
                }else{
                   res.status(400).json({message:'Email Invalido'});
                }                

             }
        } catch (error) {
            //e.status=200
            res.json(error.message)
        }
    },
   login: async function(req,res,next) {
        try {
            const message = "El email y/o contraseña son incorrectas" 
            const document = await UsersModel.findOne({email: req.body.email})
            if(!document){
                return res.json(message)
            }
            if(bcrypt.compareSync(req.body.password, document.password)){
                const token = jwt.sign(
                    {userId:document._id},
                    req.app.get("secretKey"),
                    {
                        expiresIn:"1h"
                    }
                );
                res.json(token)
            }else{
                return res.json(message)
            }
        } catch (error) {
            next(error)
        }
   }
}