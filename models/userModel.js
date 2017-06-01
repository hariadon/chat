var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    name: {type: String, required: true, max:8, min:3},
    roles: {type: [String], default:["moderator"]},
    password: {type: String, required: true},
    mobile: {type: String,  length:10},
    email: {type: String, required: true},
    address: [String],
    city: String,
    state: String,
    pincode: Number

});

module.exports= mongoose.model("user", schema);