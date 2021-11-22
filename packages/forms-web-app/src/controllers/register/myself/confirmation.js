const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getConfirmation = async (req, res) => {
  res.render(VIEW.REGISTER.MYSELF.CONFIRMATION);
};
