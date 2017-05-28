var mongoose = require("mongoose");

mongoose.Promise=global.Promise;

var schema = new mongoose.Schema({
    name: {type: String, required: true}
});

module.exports= mongoose.model("room", schema);