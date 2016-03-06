var GroupModel = require('../models/group');

module.exports = {
  createChore: function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var title = data.chore.title;
    var assignedTo = data.chore.assignedTo;

    var query = {
      members: facebookId
    };

    var chore = {
      title: title,
      assignedTo: assignedTo
    };

    return GroupModel.findOne(query)
      .then(function(group, err) {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error creating chore",
            error: err
          });
        }

        group.chores.push(chore);

        return group.save()
          .then(function(group, err) {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error creating chore",
                error: err
              });
            }

            return res.json({
              status: "OK",
              message: "Created chore",
              group: group
            });
          });
      });
  },
  deleteChore: function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var choreId = data.choreId;

    var query = {
      members: facebookId
    };

    GroupModel.findOne(query)
      .then(function(group, err) {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error deleting chore",
            error: err
          });
        }

        for (var i = 0; i < group.chores.length; i++) {
          if (group.chores[i]._id.equals(choreId)) {
            group.chores.splice(i, 1);
            break;
          }
        }

        return group.save()
          .then(function(group, err) {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error deleting chore",
                error: err
              });
            }

            return res.json({
              status: "OK",
              message: "Deleted chore",
              group: group
            });
          });
      });
  }
};
