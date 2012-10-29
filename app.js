
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

var Session = require('connect-mongodb');

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());

var oneWeek = 657450000;
  app.use(express.static(__dirname + '/public', { maxAge: oneWeek }));

  app.use(express.cookieParser());
  var session = express.session({store: new Session({url: 'mongodb://localhost:27017/test', maxAge: 300000}), secret: 'superTopSecret' });
  app.use(session);

  //  app.use(mongooseAuth.middleware());
  //app.use(require('./mySite').middleware());
  app.use(app.router);
	app.use(express.methodOverride());
	app.use(express.errorHandler());  
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
