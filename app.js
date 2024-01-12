require("dotenv").config(); // load env file
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expHbs = require('express3-handlebars');
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const async = require("async");

const app = express();

/**
 * Make MongoDB connection
 */
(async () => {
   var uri = await     
    mongoose.connect("mongodb+srv://waqasarif:dravid@cluster0.hn1lhp7.mongodb.net/proj?retryWrites=true&w=majority", { useUnifiedTopology: true }
    ,{ useNewUrlParser: true })
    .then(() => console.log(`Database connectedd`))
    .catch(err => console.log(`Database connection error: ${err.message}`));
    
})();

app.engine('hbs', expHbs({defaultLayout: 'layout', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json());


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(process.env.PORT || 3300, function(req, res){
	console.log("server started on")
});


module.exports = app;
