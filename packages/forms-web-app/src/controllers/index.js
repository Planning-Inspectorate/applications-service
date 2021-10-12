const config = require('../config');

exports.getIndex = (req, res) => {
  res.redirect(config.applications.startingPoint);
};
