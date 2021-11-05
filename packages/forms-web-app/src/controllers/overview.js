const config = require('../config');
const {Status} = require('../utils/status')
const { VIEW } = require('../lib/views');
const logger = require('../lib/logger');
const { getAppData } = require('../services/application-list.service');

exports.getOverview = async (req, res) => {
  const appData = await getAppData(req.params.case_ref);
  logger.info(appData);
  let styleClass = [];
  // let div = [];
  for (let i = 1; i <= 5; i++) {
    if (i === appData.Stage) {
      styleClass.push('class=current');
      // div.push('!');
    } else if (i < appData.Stage) {
      styleClass.push('class=completed');
      // div.push('&#10003;');
    } else {
      styleClass.push('');
      // div.push('');
    }
  } 
  // logger.info(div);
  logger.info(styleClass);
  res.render(VIEW.OVERVIEW, {appData: appData, stage: Status[appData.Stage], styleClass: styleClass});
};
