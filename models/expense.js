module.exports = {
  title: {
    type: String,
  },
  amount: {
  	type: Number
  },
  expensedBy: {
    type: String,
    ref: 'User'
  }
};
