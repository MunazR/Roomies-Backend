var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var choreSchema = require('./chore');
var expenseSchema = require('./expense');
var pantrySchema = require('./pantry');

var groupSchema = new Schema({
  owner: {
    type: String,
    ref: 'User'
  },
  members: [{
    type: String,
    ref: 'User'
  }],
  invited: [{
    type: String,
    ref: 'User'
  }],
  chores: [choreSchema],
  expenses: [expenseSchema],
  pantry: [pantrySchema]
});

module.exports = mongoose.model('Group', groupSchema);
