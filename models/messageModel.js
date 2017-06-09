var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    userId: {type: String, required: true},
    username: {type: String, required: true},
    roomId: {type: String, required: true},
    text:{type: String, required: true},
    date:{ type: Date, default: Date.now }
});

module.exports= mongoose.model("message", schema);