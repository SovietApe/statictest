const mongoose = require("../config/mongodb");
const categoriesController = require("../controllers/categoriesController");
const categoriesModel = require("./categoriesModel");
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"El campo name es obligatorio"]
    },
    surname: String,
    email: {
        type:String,
        required: [true, "El campo email es obligatorio"]
    },
    password: {
        type: String,
        required: [true, "El campo password es requerido"],
        min:    [6,"La contraseña debe tener un minimo de 6 digitos"],
        max:    [12, "La contraseña debe tener un maximo de 12 digitos"]
    }
});

userSchema.pre("save", function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next()
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel;

// get modifica el valor que va a recibir el cliente cuando hace una solicitud del tipo GET
// set modifica el valor que el cliente envia mediante un POST y guarda el dato modificado en la base de datos
/**set: function(value){
 *  return value * 1.21
 * } 
 * El dato guardado por el cliente es multiplicado por 1.21 y luego enviado a la base de datos
 * 
 */
    
    
    
    