var UserLib = require('../lib/user');
var GroupLib = require('../lib/group');
var ChoreLib = require('../lib/chore');
var ExpenseLib = require('../lib/expense');

var errorHandler = require('./error_handler');

module.exports = function(app) {
  app.post('/api/login', function(req, res) {
    return UserLib.login(req, res)
      .catch(errorHandler(req, res));
  });

  app.post('/api/users', function(req, res) {
    return UserLib.getUsers(req, res)
      .catch(errorHandler(req, res));
  });

  app.post('/api/invites', function(req, res) {
    return GroupLib.getInvites(req, res)
      .catch(errorHandler(req, res));
  });

  app.post('/api/group', function(req, res) {
    return GroupLib.getGroup(req, res)
      .catch(errorHandler(req, res));
  });

  app.post('/api/group/create', function(req, res) {
    return GroupLib.createGroup(req, res)
      .catch(errorHandler(req, res));
  });

  app.post('/api/group/delete', function(req, res) {
    return GroupLib.deleteGroup(req, res)
      .catch(errorHandler(req, res));
  });

  app.post('/api/group/leave', function(req, res) {
    return GroupLib.leaveGroup(req, res)
      .catch(errorHandler(req, res));
  });

  app.post('/api/group/kick', function(req, res) {
    return GroupLib.kickFromGroup(req, res)
      .catch(errorHandler(req, res));
  });

  app.post('/api/group/invite', function(req, res) {
    return GroupLib.inviteToGroup(req, res)
      .catch(errorHandler(req, res));
  });

  app.post('/api/group/uninvite', function(req, res) {
    return GroupLib.uninviteToGroup(req, res)
      .catch(errorHandler(req, res));
  });

  app.post('/api/group/accept', function(req, res) {
    return GroupLib.acceptInvite(req, res)
      .catch(errorHandler(req, res));
  });

  app.post('/api/chore/create', function(req, res) {
    return ChoreLib.createChore(req, res)
      .catch(errorHandler(req, res));
  });

  app.post('/api/chore/delete', function(req, res) {
    return ChoreLib.deleteChore(req, res)
      .catch(errorHandler(req, res));
  });

  app.post('/api/expense/create', function(req, res) {
    return ExpenseLib.createExpense(req, res)
      .catch(errorHandler(req, res));
  });

  app.post('/api/expense/delete', function(req, res) {
    return ExpenseLib.deleteExpense(req, res)
      .catch(errorHandler(req, res));
  });
}
