const {Status} = require('../utils/status')
const { VIEW } = require('../lib/views');
const logger = require('../lib/logger');
const { getAppData } = require('../services/application.service');

exports.getOverview = async (req, res) => {
  const appData = await getAppData(req.params.case_ref);

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
  req.session.claimRef = req.params.case_ref;
  req.session.projectName = appData.ProjectName;
  res.render(VIEW.OVERVIEW, {appData: appData, stage: Status[appData.Stage], styleClass: styleClass});
};
