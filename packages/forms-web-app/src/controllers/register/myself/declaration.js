const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getDeclaration = async (req, res) => {
  logger.info('-----------------------'+JSON.stringify(req.session));
  res.render(VIEW.REGISTER.MYSELF.DECLARATION);
};
