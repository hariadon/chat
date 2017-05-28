var passport=require("passport");
var LocalStrategy=require("passport-local").Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var _=require("lodash");
var db = require("./data/chatDB");

/*passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://www.example.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });*/

passport.use(new LocalStrategy(function (username, password, done) {
    db.connect.then(function(){
        return db.User.find().exec();
    }).then(function (users) {
       var user= _.find(users, u => u.name === username);
        if (!user||user.password!==password) {
            return done(null, false, { message: 'Incorrect username or password' });
        }
        done(null,user);
    });

}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    //var user=_.find(users,u=>u.contact.mobile===id);
        done(null, user);
});