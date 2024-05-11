const mongoose = require("../config/mongodb");
const categoriesController = require("../controllers/categoriesController");
const categoriesModel = require("./categoriesModel");
const {v4} = require('uuid')

const videosSchema = mongoose.Schema({
    id: {
        type: String,
    },
    etag:{
        type: String,
    },
    snippet: {
        type: Object,
    },
    playlists:{
        type: Array
    }
});

videosSchema.set("toJSON", {getters: true, setters: true, virtual: true})
const videosModel = mongoose.model("videos", videosSchema)
module.exports = videosModel