var express = require("express");
var db = require("./data/chatDB");

var router = express.Router();
module.exports = router;

router.post('/signup',function (req, res, next) {
    if(req.body.password!==req.body.confirm) return next("confirm-password and password don't match!");
    var user =  new db.User();
        user.name = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;

    user.save().then((err,user) => {
        req.user = res.locals.user = user;
        res.redirect('/');
    }).catch(next);
});