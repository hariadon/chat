var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    name: {type: String, required: true},
    users:{type:[String]},
    info:{type:String, default:'info'}
});

module.exports= mongoose.model("room", schema);