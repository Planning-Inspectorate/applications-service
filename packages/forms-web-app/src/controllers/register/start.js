const logger = require('../../lib/logger');
const { VIEW } = require('../../lib/views');
const config = require('../../config');
const registrationData = require('../../lib/registration-data.json');

exports.getStart = async (req, res) => {
  delete req.session.registrationData;
  if (!req.session.registrationData) {
    req.session.registrationData = registrationData;
  }
  logger.info('-----------------------'+JSON.stringify(req.session));
  res.render(VIEW.REGISTER.START, {serviceName: config.serviceName});
};
