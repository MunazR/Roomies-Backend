var UserModel = require('../models/user');
var GroupModel = require('../models/group');

module.exports = function(app) {
  app.post('/api/login', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;

    UserModel.findById(facebookId)
      .populate('invitedTo')
      .deepPopulate('invitedTo.owner')
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

  app.post('/api/group', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var query = {
      members: facebookId
    };

    GroupModel.findOne(query)
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
            message: "Error deleting group",
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
                message: "Error deleting group",
                error: err
              });
            }

            return res.json({
              status: "OK",
              message: "Deleted group",
              data: result
            })
          });
      })
  });
}
