var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
var handlebars = require('express-handlebars').create({
    defaultLayout: 'mobile',
    extname: '.hbs',
    helpers: {
        section: function(name, options){
            this._sections = this._sections || {};
            this._sections[name] = options.fn(this);
        },
        autoVer: function(src){
            return src + '?5';
        },
        compare: function(left, operator, right, options){
            if (arguments.length < 3) {
               throw new Error('Handlerbars Helper "compare" needs 2 parameters');
            }
            var operators = {
               '==':     function(l, r) {return l == r; },
               '===':    function(l, r) {return l === r; },
               '!=':     function(l, r) {return l != r; },
               '!==':    function(l, r) {return l !== r; },
               '<':      function(l, r) {return l < r; },
               '>':      function(l, r) {return l > r; },
               '<=':     function(l, r) {return l <= r; },
               '>=':     function(l, r) {return l >= r; },
               'typeof': function(l, r) {return typeof l == r; }
            };

            if (!operators[operator]) {
               throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
            }

            var result = operators[operator](left, right);

            if (result) {
               return options.fn(this);
            } else {
               return options.inverse(this);
            }
        }
    }
});

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.use(favicon(path.join(__dirname, 'favicon.ico')));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.set('Cache-Control', 'private, max-age=120');
    next();
})

//路由
var routes_index = require('./routes/index');
app.use(routes_index);    //web端路由文件

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var debug = require('debug')('xpc-app');

app.set('port', process.env.PORT || 8040);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});


module.exports = app;
