var mongoose = require("mongoose");

mongoose.Promise=global.Promise;

var schema = new mongoose.Schema({
    name: {type: String, required: true,min:6},
    roles: {type: [String], required: true},
    password: {type: String, required: true},
    contact: {mobile: String,
        email: String},
    address: {lines: [String],
        city: String,
        state: String,
        pincode: Number}
});

module.exports= mongoose.model("user", schema);