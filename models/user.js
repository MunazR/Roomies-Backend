var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var userSchema = new Schema({
  _id: {
    type: String // facebook id
  },
  firstName: String,
  lastName: String,
  displayName: String,
  profilePictureUrl: String,
  invitedTo: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }]
});

userSchema.plugin(deepPopulate);
module.exports = mongoose.model('User', userSchema);
