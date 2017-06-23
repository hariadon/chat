var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    userId: {type: String, required: true},
    username: {type: String},
    roomId: {type: String},
    text:{type: String, required: true},
    date:{ type: Date, default: Date.now }
});

module.exports= mongoose.model("message", schema);