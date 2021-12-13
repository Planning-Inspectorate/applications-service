const logger = require('../../lib/logger');
const { VIEW } = require('../../lib/views');
const config = require('../../config');

exports.getStart = async (req, res) => {
  if (req.session.caseRef === undefined) {
    res.redirect(`/${VIEW.PROJECT_SEARCH}`);
  } else {
    res.render(VIEW.REGISTER.START, {serviceName: config.serviceName});
  }
};
