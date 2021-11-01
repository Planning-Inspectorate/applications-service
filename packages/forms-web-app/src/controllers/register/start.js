const { VIEW } = require('../../lib/views');
const config = require('../../config');

exports.getStart = async (req, res) => {
  res.render(VIEW.REGISTER.START, {serviceName: config.serviceName});
};
