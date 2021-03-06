
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var login = require('./routes/login');
var screen2 = require('./routes/screen2');
var alertsettings = require('./routes/alertsettings');
var profile = require('./routes/profile');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//redesigned pages
app.get('/home', index.view);
app.get('/', login.view);
app.get('/screen2', screen2.view);
app.get('/alertsettings', alertsettings.view);
app.get('/profile', profile.view);

//OLD pages
app.get('/homeOLD', index.viewOLD);
app.get('/OLD', login.viewOLD);
app.get('/screen2OLD', screen2.viewOLD);
app.get('/alertsettingsOLD', alertsettings.viewOLD);
app.get('/profileOLD', profile.viewOLD);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
