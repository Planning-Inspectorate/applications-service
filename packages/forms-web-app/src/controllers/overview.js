const config = require('../config');
const {Status} = require('../utils/status')
const { VIEW } = require('../lib/views');
const logger = require('../lib/logger');
const { getAppData } = require('../services/application.service');

exports.getOverview = async (req, res) => {
  const appData = await getAppData(req.params.case_ref);
  const coordinates = appData.LatLong.split(",");
  let styleClass = [];
  for (let i = 1; i <= 5; i++) {
    if (i === appData.Stage) {
      styleClass.push('class=current');
    } else if (i < appData.Stage) {
      styleClass.push('class=completed');
    } else {
      styleClass.push('');
    }
  } 

  res.render(VIEW.OVERVIEW, {appData: appData, coordinates: coordinates, stage: Status[appData.Stage], styleClass: styleClass});
};
