module.exports = function(res) {
  return function(err) {
    // TODO better error logging
    console.log(err);

    return res.status(500).send({
      status: "error",
      message: "Unexpected internal error occurred",
      err: err
    });
  };
};
