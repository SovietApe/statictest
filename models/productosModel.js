const mongoose = require("../config/mongodb");
const categoriesController = require("../controllers/categoriesController");
const categoriesModel = require("./categoriesModel");
const {v4} = require('uuid')

const productosSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El Campo Es Obligatorio"]
    },
    price: {
        type: Number,
        min: [0, "Debe introducir un valor mayor a cero"],
        get: function (value) {
            console.log(value)
            if(value>100){
                return value * 1.21;
            }else{
                return value
            }
        }
    },
    image: {
        type:String,
        required: [true, "Se requiere una imagen para proseguir"]
    },
    description: String,
    quantity: Number,
    status: String,
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "categories",
    },
    code: {
        type: String,
        set: function(value){
            return v4()
        }
           
        
    }
});

productosSchema.virtual("price_currency").get(function(){
    return `$${this.price}`    
})

productosSchema.set("toJSON", {getters: true, setters: true, virtuals: true})
const productsModel = mongoose.model("productos", productosSchema)

module.exports = productsModel;

// get modifica el valor que va a recibir el cliente cuando hace una solicitud del tipo GET
// set modifica el valor que el cliente envia mediante un POST y guarda el dato modificado en la base de datos
/**set: function(value){
 *  return value * 1.21
 * } 
 * El dato guardado por el cliente es multiplicado por 1.21 y luego enviado a la base de datos
 * 
 */
    
    
    
    