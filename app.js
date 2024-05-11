var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const schedule = require('node-schedule')
const youtubeVideosRefresh = require('./requests/youtubeRequest');

//youtubeData
  const apiKey = "AIzaSyDmbBznvlOCe8cI1pCfuZ__llk3hT1UB98"
  const baseApiUrl = "https://www.googleapis.com/youtube/v3"
//ENDyoutubeData
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var useProducts = require('./routes/productos')
var useCategories = require('./routes/categories')
var useVideos = require('./routes/videos')
var usePlaylists = require('./routes/playlists')
var useSearch = require('./routes/search');
var app = express();

app.set("secretKey","dnNode")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** HEADER INICIO CORS */
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
  next();
});
app.options("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With,x-access-token"
  );
  res.send(200);
});
/** HEADER FIN CORS */



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', useProducts)
//app.use('/products',verifyToken,useProducts)
app.use('/categories', useCategories)
app.use('/videos', useVideos)
app.use('/playlists', usePlaylists)
app.use('/search', useSearch)
function verifyToken(req,res,next){
  const authHeader = req.headers['authorization']
  if(authHeader){
    const token = authHeader.split(" ")[1];
    jwt.verify(token,req.app.get("secretKey"), function(error,payload){
      if(error){
        res.status(401).json({message: error.message})
      }else{
        console.log(payload)
        next()
        return;
      }
    })
  }else{
    return res.status(401).json("Token must be provided")
  }
}
app.verifyToken = verifyToken;

schedule.scheduleJob('16 * * * *', function(){
  youtubeVideosRefresh()
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
