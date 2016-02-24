var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var config = require('./config');

var routes = require('./api/routes');

var UserModel = require('./models/user');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || config.server.port;

var router = express.Router();

router.use(function(req, res, next) {
  // Expose DB models throughout API
  console.log('Middleware running');
  req.UserModel = UserModel;
  next();
});

// Register routes
routes(app);

router.get('/', function(req, res) {
  res.json({
    message: "Roomies Backend API"
  });
});

app.use('/api', router);

app.listen(port);
console.log('Starting server on port: ' + port);

mongoose.Promise = bluebird;

var dbUri = config.db.uri;
mongoose.connect(dbUri);
