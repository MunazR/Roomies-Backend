var logger = require('winston');

module.exports = function(req, res) {
  return function(err) {
    logger.error("Unexpected error", {
      err: err,
      req: req
    });

    return res.status(500).send({
      status: "error",
      message: "Unexpected internal error occurred",
      err: err
    });
  };
};
