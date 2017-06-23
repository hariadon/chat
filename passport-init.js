var passport=require("passport");
var LocalStrategy=require("passport-local").Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
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
   db.User.findOne({name:username, password:password}).exec()
       .then(function (user) {
           if (!user) return done(null, false, { error: 'Incorrect username or password' });
           done(null,user);
       });
}));

passport.serializeUser(function(user, done) {
    done(null, user._id+'@'+user.name);
});

passport.deserializeUser(function(u, done) {
    db.User.findById(u.split('@')[0]).exec()
        .then(user => done(null, user));
});