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
        res.locals.user.save()
            .then(user => {
                req.logIn(user, err => {
                    if (err) return next(err);
                    return res.redirect('/');
                });
            }).catch(err=> {
                res.locals.errors=err.errors
                res.redirect(req.baseUrl);
        });

    });

