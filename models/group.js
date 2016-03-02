var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
  owner: {
    type: String,
    ref: 'User'
  },
  members: [{
    type: String,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Group', groupSchema);
