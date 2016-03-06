var UserLib = require('../lib/user');
var GroupLib = require('../lib/group');
var ChoreLib = require('../lib/chore');

module.exports = function(app) {
  app.post('/api/login', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;

    if (facebookId && facebookId.length) {
      return UserLib.login(req, res);
    } else {
      return res.status(400).send({
        status: "Bad request",
        message: "Invalid data"
      });
    }
  });

  app.post('/api/users', function(req, res) {
    var data = req.body;
    var name = data.name;
    var facebookId = data.facebookId;

    if (name && name.length && facebookId && facebookId) {
      return UserLib.getUsers(req, res);
    } else {
      return res.status(400).send({
        status: "Bad request",
        message: "Invalid data"
      });
    }
  });

  app.post('/api/invites', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;

    if (facebookId && facebookId.length) {
      return GroupLib.getInvites(req, res);
    } else {
      return res.status(400).send({
        status: "Bad request",
        message: "Invalid data"
      });
    }
  });

  app.post('/api/group', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;

    if (facebookId && facebookId.length) {
      return GroupLib.getGroup(req, res);
    } else {
      return res.status(400).send({
        status: "Bad request",
        message: "Invalid data"
      });
    }
  });

  app.post('/api/group/create', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;

    if (facebookId && facebookId.length) {
      return GroupLib.createGroup(req, res);
    } else {
      return res.status(400).send({
        status: "Bad request",
        message: "Invalid data"
      });
    }
  });

  app.post('/api/group/delete', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;

    if (facebookId && facebookId.length) {
      return GroupLib.deleteGroup(req, res);
    } else {
      return res.status(400).send({
        status: "Bad request",
        message: "Invalid data"
      });
    }
  });

  app.post('/api/group/leave', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;

    if (facebookId && facebookId.length) {
      return GroupLib.leaveGroup(req, res);
    } else {
      return res.status(400).send({
        status: "Bad request",
        message: "Invalid data"
      });
    }
  });

  app.post('/api/group/kick', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var kickId = data.kickId;

    if (facebookId && facebookId.length && kickId && kickId.length) {
      return GroupLib.kickFromGroup(req, res);
    } else {
      return res.status(400).send({
        status: "Bad request",
        message: "Invalid data"
      });
    }
  });

  app.post('/api/group/invite', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var invitedId = data.invitedId;

    if (facebookId && facebookId.length && invitedId && invitedId) {
      return GroupLib.inviteToGroup(req, res);
    } else {
      return res.status(400).send({
        status: "Bad request",
        message: "Invalid data"
      });
    }
  });

  app.post('/api/group/uninvite', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var invitedId = data.invitedId;

    if (facebookId && facebookId.length && invitedId && invitedId.length) {
      return GroupLib.uninviteToGroup(req, res);
    } else {
      return res.status(400).send({
        status: "Bad request",
        message: "Invalid data"
      });
    }
  });

  app.post('/api/group/accept', function(req, res) {
    var data = req.body;
    var ownerId = data.ownerId;
    var facebookId = data.facebookId;

    if (ownerId && ownerId.length && facebookId && facebookId.length) {
      return GroupLib.acceptInvite(req, res);
    } else {
      return res.status(400).send({
        status: "Bad request",
        message: "Invalid data"
      });
    }
  });

  app.post('/api/chore/create', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var chore = data.chore;

    if (facebookId && facebookId.length && chore && chore.title && chore.title.length && chore.assignedTo && chore.assignedTo.length) {
      return ChoreLib.createChore(req, res);
    } else {
      return res.status(400).send({
        status: "Bad request",
        message: "Invalid data"
      });
    }
  });

  app.post('/api/chore/delete', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var choreId = data.choreId;

    if (facebookId && facebookId.length && choreId && choreId.length) {
      return ChoreLib.deleteChore(req, res);
    } else {
      return res.status(400).send({
        status: "Bad request",
        message: "Invalid data"
      });
    }
  });
}
