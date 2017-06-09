var express = require("express");
var db = require("../data/chatDB");

var router = express.Router();
module.exports = router;

router.use(function (req, res, next) {
    if(req.user.roles.indexOf("admin")>-1)return next();
    res.redirect('/');
});

router.get('/', function (req, res, next) {
        db.Room.find().exec()
        .then(rooms => res.render("rooms/rooms",{title:'Rooms',rooms:rooms}))
        .catch(next);
});

router.route('/add')
    .get(function (req, res) {
        res.render("rooms/add");
    })
    .post(function (req, res, next) {
        var room = new db.Room(req.body);
        room.save().then(() => res.redirect('/admin/rooms'))
        .catch(next);
    });

router.route('/update/:roomId')
    .all(function (req, res, next) {
        var roomId=req.params.roomId;
        db.Room.findById(roomId).exec()
            .then(room =>  {
                if(!room)return res.sendStatus(404);
                res.locals.room=room;
                next();
            }).catch(next);
    })
    .get(function (req, res, next) {
        res.render("rooms/update",res.locals.room);
    })
    .post(function(req, res, next){
        var room = {};
        room.name = req.body.name;
        room.info = req.body.info;
        db.Room.findByIdAndUpdate(res.locals.room._id, room).exec()
            .then(() => res.redirect("/admin/rooms"))
            .catch(next);
    });

router.get('/delete/:roomId',function(req, res, next){
    var roomId=req.params.roomId;
    db.Room.findByIdAndRemove(roomId).exec()
        .then(() => res.redirect("/admin/rooms"))
        .catch(next);
});