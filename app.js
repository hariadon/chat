var express=require("express");
var favicon = require("express-favicon");
var bodyParser=require("body-parser");
var flash = require("connect-flash");
var compression = require("compression");
var db = require("./data/chatDB");
var session = require("express-session")({ secret: 'total-secret',  resave: false, saveUninitialized: true });
var sharedsession = require("express-socket.io-session");
var passport=require("passport");
require("./passport-init");


var app=express();
app.io=require('socket.io')();
app.use(compression());
app.set('views','./views');
app.set('view engine','pug');


app.use(require("./loggging.js"));
app.use(require("morgan")("dev"));
app.use(express.static('public'));
app.use(favicon(__dirname+"/public/favicon.ico"));
app.use(express.static('node_modules/socket.io/node_modules/socket.io-client/dist'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session);
app.io.use(sharedsession(session));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//require("express-debug")(app,{});



var authRouter=require("./auth");
app.use(authRouter);

app.use(function (req, res, next) {
    if(req.isAuthenticated()){
        res.locals.user=req.user;
        return next();
    }
    res.redirect('/login');
});


app.get('/',function (req, res) {
    res.render('home',{title:'Home'});
});
app.use('/user',require("./user"));

var userRouter=require("./admin/users");
app.use('/admin/users',userRouter);

var roomRouter=require("./admin/rooms");
app.use('/admin/rooms',roomRouter);

var apiRouter=require("./api");
app.use('/api',apiRouter);


//listen with socket.io
app.io.on('connection', function(socket){
    console.log('a user connected................. ');

    socket.on('new message', msg => {// receive from client
        var userinfo = socket.handshake.session.passport.user.split('@'),
            message={
                roomId:msg.roomId,
                userId:userinfo[0],
                username:userinfo[1],
                text:msg.text
            };
        new db.Message(message).save()
            .then(m =>// send to all clients
                app.io.emit('chat message' , m));

    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;