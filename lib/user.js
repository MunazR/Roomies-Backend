var UserModel = require('../models/user');

module.exports = {
  login: function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;

    return UserModel.findById(facebookId)
      .then(function(user) {
        if (user) {
          return res.json({
            status: "OK",
            message: "Returning user",
            user: user
          });
        }

        user = new UserModel({
          _id: data.facebookId,
          firstName: data.firstName,
          lastName: data.lastName,
          displayName: data.displayName,
          profilePictureUrl: data.profilePictureUrl
        });

        return user.save()
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
  },
  getUsers: function(req, res) {
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

    return UserModel.find(query)
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
          message: "No users found"
        });
      });
  }
}
