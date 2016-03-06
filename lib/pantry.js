var GroupModel = require('../models/group');

module.exports = {
  createItem: function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var title = data.item.title;

    var item = {
      title: title
    };

    var query = {
      members: facebookId
    };

    return GroupModel.findOne(query)
      .then(function(group, err) {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error creating pantry item",
            error: err
          });
        }

        group.pantry.push(item);

        return group.save()
          .then(function(group, err) {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error creating pantry item",
                error: err
              });
            }

            return res.json({
              status: "OK",
              message: "Created pantry item",
              group: group
            });
          });
      });
  },
  deleteItem: function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var itemId = data.itemId;

    var query = {
      members: facebookId
    };

    return GroupModel.findOne(query)
      .then(function(group, err) {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error deleting pantry item",
            error: err
          });
        }

        for (var i = 0; i < group.pantry.length; i++) {
          if (group.pantry[i]._id.equals(itemId)) {
            group.pantry.splice(i, 1);
            break;
          }
        }

        return group.save()
          .then(function(group, err) {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error deleting pantry item",
                error: err
              });
            }

            return res.json({
              status: "OK",
              message: "Deleted pantry item",
              group: group
            });
          });
      });
  }
};
