var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./config');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || config.server.port;


var router = express.Router();

router.get('/', function(req, res) {
  res.json({
    message: "Roomies Backend API"
  });
});

app.use('/api', router);

app.listen(port);
console.log('Starting server on port: ' + port);
