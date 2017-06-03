var express = require("express");
var db = require("../data/chatDB");
var util = require("../public/util");

var router = express.Router();
module.exports = router;

router.use(function (req, res, next) {
    if(req.user.roles.indexOf("admin")>-1)return next();
    res.redirect('/');
});

router.get('/', function (req, res, next) {
 db.User.find().exec()
        .then(users => res.render("users/users",{title:'Users',users:users}))
        .catch(next);
});



router.route('/add')
    .get(function (req, res) {
        res.render("users/add");
    })
    .post(function (req, res, next) {
        var user = new db.User(req.body);
        user.save().then(() => res.redirect("/admin/users") )
        .catch(next);
    });

router.route('/update/:userId')
    .all(function (req, res, next) {
        var userId=req.params.userId;
        db.User.findById(userId).exec()
           .then(user =>  {
            if(!user)return res.sendStatus(404);
            res.locals.usr=user;
            next();
           }).catch(next);
    })
    .get(function (req, res, next) {
        res.render("users/update",res.locals.usr);
    })
    .post(function(req, res, next){
        var user = {};
        util.setParams(user, req);
        db.User.findByIdAndUpdate(res.locals.usr._id,user).exec()
            .then(() => res.redirect("/admin/users"))
            .catch(next);
    });

router.get('/delete/:userId',function(req, res, next){
        var userId=req.params.userId;
        db.User.findByIdAndRemove(userId).exec()
            .then(() => res.redirect("/admin/users"))
            .catch(next);
    });