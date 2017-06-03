var express = require("express");
var db = require("./data/chatDB");
var util = require("./public/util");

var router = express.Router();
module.exports = router;

router.route('/update')
    .get(function (req, res, next) {
        res.render("user", res.locals.user);
    })
    .post(function (req, res, next) {
        var user = {};
        util.setParams(user, req);
        db.User.findByIdAndUpdate(res.locals.user._id, user).exec()
            .then(user => {
                req.logIn(user, err => {
                    if (err) return next(err);
                    return res.redirect('/');
                }).catch(next);
            });
    });

