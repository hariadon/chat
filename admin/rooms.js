var _ = require("lodash");
var express = require("express");
var db = require("../data/chatDB");

var router = express.Router();
module.exports = router;

router.use(function (req, res, next) {
    if(req.user.roles.indexOf("admin")>-1)return next();
    res.redirect('/login');
});

router.get('/', function (req, res) {
    db.connect
        .then(() => db.Room.find().exec())
        .then(rooms => res.render("rooms/rooms",{title:'Rooms',rooms:rooms}));
});

router.route('/add')
    .get(function (req, res) {
        res.render("rooms/add");

    }).post(function (req, res) {
        var room = new db.Room(req.body);
        room.save().then(() => res.redirect('/admin/rooms') );
    });