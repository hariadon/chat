    var express=require("express");
    var passport=require("passport");
    var flash = require('connect-flash');
    var db = require('./data/chatDB');


    var router =express.Router();
    module.exports=router;
    router.use(flash());

router.post('/signup',function (req, res, next) {
    if (req.body.password !== req.body.confirm) return next(new Error("confirm-password and password don't match!"));
         var user = new db.User();
         user.name = req.body.username;
         user.email = req.body.email;
         user.password = req.body.password;

    user.save().then(user => {
        req.logIn(user, err => {
            if (err) return next(err);
            return res.redirect('/');
        }).catch(next);
    });
});

router.get('/login', function (req, res, next) {
    /*   if(req.app.get("env")==="development") {
    db.connect
    .then(() => db.User.findOne({name: 'hari'}).exec())
    .then(user => {
    req.logIn(user, err => {
    if (err)return next(err);
    return res.redirect('/');
    });
    });
    }
    else*/ res.render("login",{title:"Login"});
});

router.post('/login',
    passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true }));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect("/login");
});