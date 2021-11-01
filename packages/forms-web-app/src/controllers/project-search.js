const config = require('../config');
const { VIEW } = require('../lib/views');
const logger = require('../lib/logger');

exports.getProjectList = async (req, res) => {
  res.render(VIEW.PROJECT_SEARCH);
};
