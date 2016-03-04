var UserModel = require('../models/user');
var GroupModel = require('../models/group');

module.exports = function(app) {
  app.post('/api/login', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;

    UserModel.findById(facebookId)
      .then(function(user) {
        // Check if user already exists
        if (user) {
          return res.json({
            status: "OK",
            message: "Returning user",
            user: user
          });
        }

        // Create new user
        user = new UserModel({
          _id: data.facebookId,
          firstName: data.firstName,
          lastName: data.lastName,
          displayName: data.displayName,
          profilePictureUrl: data.profilePictureUrl
        });

        user.save()
          .then(function(user, err) {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error creating user",
                error: err
              });
            }

            return res.json({
              status: "OK",
              message: "Created new user",
              user: user
            });
          })
      });
  });

  app.post('/api/users', function(req, res) {
    var data = req.body;
    var name = data.name;
    var facebookId = data.facebookId;

    var query = {
      "$and": [{
        _id: {
          "$ne": facebookId
        }
      }, {
        "$text": {
          "$search": name
        }
      }]
    };

    UserModel.find(query)
      .then(function(users) {
        if (users && users.length !== 0) {
          return res.json({
            status: "OK",
            message: "Found users",
            users: users
          });
        }

        return res.json({
          status: "OK",
          message: "No users"
        });
      });
  });

  app.post('/api/invites', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var query = {
      invited: facebookId
    };

    GroupModel.find(query)
      .populate('owner')
      .populate('invited')
      .populate('members')
      .then(function(groups) {
        if (groups && groups.length !== 0) {
          return res.json({
            status: "OK",
            message: "Found groups",
            groups: groups
          });
        }

        return res.json({
          status: "OK",
          message: "No groups"
        });
      });
  });

  app.post('/api/group', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var query = {
      members: facebookId
    };

    GroupModel.findOne(query)
      .populate('invited')
      .populate('members')
      .populate('owner')
      .then(function(group) {
        if (group) {
          return res.json({
            status: "OK",
            message: "Group found",
            group: group
          });
        }

        return res.json({
          status: "OK",
          message: "Group not found"
        });
      });
  });

  app.post('/api/group/create', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;

    var group = new GroupModel({
      owner: facebookId,
      members: [facebookId]
    });

    group.save()
      .then(function(group, err) {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error creating new group",
            error: err
          });
        }

        GroupModel.findById(group._id)
          .populate('owner')
          .populate('members')
          .populate('invited')
          .then(function(group, err) {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error creating new group",
                error: err
              });
            }

            return res.json({
              status: "OK",
              message: "Created group",
              group: group
            });
          });
      });
  });

  app.post('/api/group/delete', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;

    var query = {
      owner: facebookId
    };

    GroupModel.remove(query)
      .then(function(result, err) {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error deleting group",
            error: err
          });
        }

        return res.json({
          status: "OK",
          message: "Deleted group",
          data: result
        })
      })
  });

  app.post('/api/group/leave', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;

    var query = {
      members: facebookId
    };

    GroupModel
      .findOne(query)
      .then(function(group, err) {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error leaving group",
            error: err
          });
        }

        var index = group.members.indexOf(facebookId);
        if (index > -1) {
          group.members.splice(index, 1);
        }

        group.save()
          .then(function(group, err) {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error leaving group",
                error: err
              });
            }

            return res.json({
              status: "OK",
              message: "Left group"
            })
          });
      })
  });

  app.post('/api/group/kick', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var kickId = data.kickId;

    var query = {
      owner: facebookId
    };

    GroupModel
      .findOne(query)
      .then(function(group, err) {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error kicking from group",
            error: err
          });
        }

        var index = group.members.indexOf(kickId);
        if (index > -1) {
          group.members.splice(index, 1);
        }

        group.save()
          .then(function(group, err) {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error kicking from group",
                error: err
              });
            }

            return res.json({
              status: "OK",
              message: "Kicked from group"
            })
          });
      })
  });

  app.post('/api/group/invite', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var invitedId = data.invitedId;

    var query = {
      owner: facebookId
    };

    GroupModel
      .findOne(query)
      .then(function(group, err) {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error inviting to group",
            error: err
          });
        }

        var index = group.invited.indexOf(invitedId);
        if (index === -1) {
          group.invited.push(invitedId);
        }

        group.save()
          .then(function(group, err) {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error inviting to group",
                error: err
              });
            }

            return res.json({
              status: "OK",
              message: "Invited to group",
              group: group
            })
          });
      })
  });

  app.post('/api/group/uninvite', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var invitedId = data.invitedId;

    var query = {
      owner: facebookId
    };

    GroupModel
      .findOne(query)
      .then(function(group, err) {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error uninviting from group",
            error: err
          });
        }

        group.invited.pull(invitedId);

        group.save()
          .then(function(group, err) {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error inviting to group",
                error: err
              });
            }

            return res.json({
              status: "OK",
              message: "Uninvited from group",
              group: group
            })
          });
      })
  });

  app.post('/api/group/accept', function(req, res) {
    var data = req.body;
    var ownerId = data.ownerId;
    var facebookId = data.facebookId;

    var query = {
      owner: ownerId
    };

    GroupModel
      .findOne(query)
      .then(function(group, err) {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error inviting to group",
            error: err
          });
        }

        var index = group.invited.indexOf(facebookId);

        if (index !== -1) {
          group.invited.pull(facebookId);
          index = group.members.indexOf(facebookId)
          if (index === -1) {
            group.members.push(facebookId);
          }
        } else {
          return res.status(500).send({
            status: "error",
            message: "You were not invited to group"
          });
        }

        group.save()
          .then(function(group, err) {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error inviting to group",
                error: err
              });
            }

            return res.json({
              status: "OK",
              message: "Invited to group",
              group: group
            })
          });
      })
  });
}
