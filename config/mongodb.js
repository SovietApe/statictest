const mongoose = require("mongoose")

mongoose.connect(`mongodb://127.0.0.1:27017/utn2023`)
.then(()=>{console.log("connected")})
.catch((error=> console.log(error)))

module.exports = mongoose 
