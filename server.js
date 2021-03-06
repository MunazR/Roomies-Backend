var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var config = require('./config');

var routes = require('./api/routes');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || config.server.port;

var router = express.Router();

routes(app);

router.get('/', function(req, res) {
  res.json({
    status: "OK",
    message: "Roomies Backend API"
  });
});

app.use('/api', router);

app.listen(port);
console.log('Starting server on port: ' + port);

mongoose.Promise = bluebird;

var dbUrl = config.db.url;
var options = {
  user: config.db.user,
  pass: config.db.pass
};

mongoose.connect(dbUrl, options);
