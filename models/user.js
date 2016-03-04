var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: {
    type: String // facebook id
  },
  firstName: String,
  lastName: String,
  displayName: String,
  profilePictureUrl: String
});

userSchema.index({
  firstName: "text",
  lastName: "text",
  lastName: "text"
});

module.exports = mongoose.model('User', userSchema);
