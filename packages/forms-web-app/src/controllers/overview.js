const config = require('../config');
const {Status} = require('../utils/status')
const { VIEW } = require('../lib/views');
const logger = require('../lib/logger');
const { getAppData } = require('../services/application-list.service');

exports.getOverview = async (req, res) => {
  const appData = await getAppData(req.params.case_ref);
  logger.info(appData);
  res.render(VIEW.OVERVIEW, {appData: appData, stage: Status[appData.Stage]});
};
