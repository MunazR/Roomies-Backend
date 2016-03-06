var GroupModel = require('../models/group');

module.exports = {
  getInvites: function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var query = {
      invited: facebookId
    };

    return GroupModel.find(query)
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
          message: "No groups found"
        });
      });
  },
  getGroup: function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var query = {
      members: facebookId
    };

    return GroupModel.findOne(query)
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
  },
  createGroup: function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;

    var group = new GroupModel({
      owner: facebookId,
      members: [facebookId]
    });

    return group.save()
      .then(function(group, err) {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error creating new group",
            error: err
          });
        }

        return GroupModel.findById(group._id)
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
  },
  deleteGroup: function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;

    var query = {
      owner: facebookId
    };

    return GroupModel.remove(query)
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
  },
  leaveGroup: function(req, res) {
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
      });
  },
  kickFromGroup: function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var kickId = data.kickId;

    var query = {
      owner: facebookId
    };

    return GroupModel
      .findOne(query)
      .then(function(group, err) {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error kicking user from group",
            error: err
          });
        }

        var index = group.members.indexOf(kickId);
        if (index > -1) {
          group.members.splice(index, 1);
        }

        return group.save()
          .then(function(group, err) {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error kicking user from group",
                error: err
              });
            }

            return res.json({
              status: "OK",
              message: "Kicked from group"
            })
          });
      });
  },
  inviteToGroup: function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var invitedId = data.invitedId;

    var query = {
      owner: facebookId
    };

    return GroupModel
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

        return group.save()
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
              message: "Invited user to group",
              group: group
            })
          });
      });
  },
  uninviteToGroup: function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var invitedId = data.invitedId;

    var query = {
      owner: facebookId
    };

    return GroupModel
      .findOne(query)
      .then(function(group, err) {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error uninviting user from group",
            error: err
          });
        }

        return group.invited.pull(invitedId);

        group.save()
          .then(function(group, err) {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error uninviting user from group",
                error: err
              });
            }

            return res.json({
              status: "OK",
              message: "Uninvited user from group",
              group: group
            })
          });
      });
  }
}
