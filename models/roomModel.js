var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    name: {type: String, required: true},
    users:{type:[String]}
});

module.exports= mongoose.model("room", schema);