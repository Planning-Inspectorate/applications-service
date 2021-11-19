const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');
const config = require('../../../config');

exports.getCheckYourAnswers = async (req, res) => {
  logger.info('-----------------------'+JSON.stringify(req.session.registrationData));
  res.render(VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS, {data: req.session.registrationData});
};
