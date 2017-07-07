var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./sources/routes/index');

var cors = require('cors')

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var app = express();


//===============EXPRESS================

    // view engine setup
    app.set('views', path.join(__dirname, 'sources/views'));
    app.set('view engine', 'jade');


    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(express.static(path.join(__dirname, 'public')));
    //app.use(cors())
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", '*'); //<-- you can change this with a specific url like http://localhost:4200
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });





//===============ROUTES=================


    //======= INDEX =======
    app.use('/', index);

    //====== DOCUMENTATION ======
    app.use('/documentation', express.static(path.join(__dirname, './public/out')))

    // ...
    var swaggerUi = require('swagger-ui-express'); // line 7
    var swaggerJSDoc = require('swagger-jsdoc'); // line 8

    // ...
    var options = { // line 27
      swaggerDefinition: {
        info: {
          title: 'swagger-express-jsdoc', // Title (required)
          version: '1.0.0', // Version (required)
        },
      },
      apis: ['./sources/routes/index.js'], // Path to the API docs
    };
    var swaggerSpec = swaggerJSDoc(options); // line 36

    // ...
    app.get('/user-guide.json', function(req, res) { // line 41
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });

    // ...
    app.use('/user-guide', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // line 45




//=============ERROR =====================


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
