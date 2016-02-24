var UserModel = require('../models/user');

module.exports = function(app) {
  app.post('/api/login', function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var facebookToken = data.facebookToken;
    var query = {
      facebookId: facebookId
    };

    UserModel.findOne(query)
      .then(function(user) {
        // Check if user already exists
        if (user) {
          // Check if token is up to date
          if (user.facebookToken === data.facebookToken) {
            return res.json({
              status: "OK",
              message: "Returning user"
            });
          }

          // Update Facebook Token
          user.facebookToken = data.facebookToken
          user.save()
            .then(function() {
              return res.json({
                status: "OK",
                message: "Updated Facebook token"
              });
            });
        }

        // Create new user
        user = new UserModel();
        user.facebookId = data.facebookId;
        user.facebookToken = data.facebookToken;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.displayName = data.displayName;
        user.profilePictureUrl = data.profilePictureUrl;

        user.save()
          .then(function() {
            return res.json({
              statius: "OK",
              message: "Created new user"
            });
          })
      });
  });
}
