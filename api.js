var uuid = require("node-uuid");
var _ = require("lodash");
var db = require("./data/chatDB");
var express = require("express");

var router = express.Router();
module.exports = router;

router.get('/rooms', function (req, res) {
    db.connect
        .then(() => db.Room.find().exec())
        .then(rooms=> res.json(rooms));
});

router.route('/rooms/:roomId/messages')
    .get(function (req, res) {
        var roomId=req.params.roomId;
        db.connect
            .then(() => db.Message.find({roomId:roomId}).exec())
            .then(messages => res.json(messages));

    }).post(function (req, res) {

    var roomId=req.params.roomId;
    db.connect
        .then(() => db.Room.find({_id:roomId}).exec())
        .then(room => {if (!room) res.sendStatus(404);return;});

    var message={
        roomId:roomId,
        userId:req.user._id,
        text:req.body.text
    };
    db.connect.then(() => db.Message.insert(message).exec()).then(() =>  res.sendStatus(200));

    }).delete(function (req, res){

    var roomId=req.params.roomId;
    db.connect
        .then(() => db.Message.remove({roomId:roomId}).exec())
        .then(() => res.sendStatus(200));

});