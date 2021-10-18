const logger = require('../../lib/logger');
const { VIEW } = require('../../lib/views');

exports.getFullName = async (req, res) => {
  res.render(VIEW.REGISTER.FULL_NAME);
};
