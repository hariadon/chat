var db = require("./data/chatDB");
var express = require("express");

var router = express.Router();
module.exports = router;

router.get('/rooms', function (req, res, next) {
   db.Room.find().exec()
        .then(rooms=> res.json(rooms))
        .catch(next);
});

router.route('/rooms/:roomId/messages')
    .all(function (req, res, next){
     db.Room.findById(req.params.roomId).exec()
        .then(room=> {
            if(!room)return res.sendStatus(404);
            res.locals.room = room;
            next();
        }).catch(next);

     })
    .get(function (req, res, next) {
        var room = res.locals.room;
       db.Message.find({roomId:room._id}).exec()
            .then(messages => res.json({"room":room,"msgs":messages}))
            .catch(next);

    })
    .post(function (req, res, next) {
        var message = {
                        roomId:req.params.roomId,
                        username:req.user.name,
                        userId:req.user._id,
                        text:req.body.text
                      };
        new db.Message(message).save()
            .then(() =>  res.redirect(req.baseUrl))
            .catch(next);

    })
    .delete(function (req, res, next){
        db.Message.remove({roomId:req.params.roomId})
            .then(() =>  res.redirect(req.baseUrl))
            .catch(next);

    });