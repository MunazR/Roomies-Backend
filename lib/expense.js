var GroupModel = require('../models/group');

module.exports = {
  createExpense: function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;

    var title = data.expense.title;
    var amount = data.expense.amount;
    var expensedBy = data.expense.expensedBy;

    var expense = {
      title: title,
      amount: amount,
      expensedBy: expensedBy
    };

    var query = {
      members: facebookId
    };

    return GroupModel.findOne(query)
      .then(function(group, err) {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error creating expense",
            error: err
          });
        }

        group.expenses.push(expense);

        return group.save()
          .then(function(group, err) {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error creating expense",
                error: err
              });
            }

            return res.json({
              status: "OK",
              message: "Created expense",
              group: group
            });
          });
      });
  },
  deleteExpense: function(req, res) {
    var data = req.body;
    var facebookId = data.facebookId;
    var expenseId = data.expenseId;

    var query = {
      members: facebookId
    };

    return GroupModel.findOne(query)
      .then(function(group, err) {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error deleting expense",
            error: err
          });
        }

        for (var i = 0; i < group.expenses.length; i++) {
          if (group.expenses[i]._id.equals(expenseId)) {
            group.expenses.splice(i, 1);
            break;
          }
        }

        return group.save()
          .then(function(group, err) {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error deleting expense",
                error: err
              });
            }

            return res.json({
              status: "OK",
              message: "Deleted expense",
              group: group
            });
          });
      });
  }
};
