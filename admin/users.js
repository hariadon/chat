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
        .then(() => db.User.find().exec())
        .then(users => res.render("users/users",{title:'Users',users:users}));
});

router.route('/add')
    .get(function (req, res) {
        res.render("users/add");

    }).post(function (req, res) {
    var user = new db.User(req.body);
    user.save().then(() => res.redirect("/admin/users") );

    });

router.route('/update/:userId')
    .all(function (req, res, next) {
        var userId=req.params.userId;
        db.User.findById(userId).exec()
           .then(user =>  {
            if(!user)res.sendStatus(404);return;
            res.locals.user=user;
            next();
           });
    })
    .get(function (req, res) {
        res.render("users/update",res.locals.user);
    })
    .post(function(req, res){
        var user = new db.User(req.body);
        db.User.update(user).exec()
            .then(() => res.redirect("/admin/users"));
    });

router.get('/delete/:userId',function(req, res){
        var userId=req.params.userId;
        db.User.findByIdAndRemove(userId).exec()
            .then(() => res.redirect("/admin/users"));
    });
