var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: String,
  lastName: String,
  displayName: String,
  profilePictureUrl: String,
  facebookId: String,
  facebookToken: String,
});


module.exports = mongoose.model('User', userSchema);
