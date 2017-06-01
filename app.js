var express=require("express");
var favicon = require("express-favicon");
var bodyParser=require("body-parser");
var passport=require("passport");
require("./passport-init");


var app=express();
app.set('views','./views');
app.set('view engine','pug');


app.use(require("./loggging.js"));
app.use(require("morgan")("dev"));
app.use(express.static('public'));
app.use(favicon(__dirname+"/public/favicon.ico"));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(require("express-session")({ secret: 'keyboard cat',  resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//require("express-debug")(app,{});

app.use(require("./signup"));

var authRouter=require("./auth");
app.use(authRouter);

app.use(function (req, res, next) {
    if(req.isAuthenticated()){
        res.locals.user=req.user;return next();
    }
    res.redirect('/login');
});

app.get('/',function (req,res) {
    res.render('home',{title:'Home'});
});


var userRouter=require("./admin/users");
app.use('/admin/users',userRouter);

var roomRouter=require("./admin/rooms");
app.use('/admin/rooms',roomRouter);

var apiRouter=require("./api");
app.use('/api',apiRouter);

app.listen(process.env.PORT || 3000,function () {
    console.log('listening at 3000');
});