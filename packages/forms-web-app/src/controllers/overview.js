const moment = require('moment');
const { Status } = require('../utils/status');
const { VIEW } = require('../lib/views');
const logger = require('../lib/logger');
const { getAppData } = require('../services/application.service');

function dayOfWeekAsString(dayIndex) {
  return (
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex] || ''
  );
}
exports.getOverview = async (req, res) => {
  const response = await getAppData(req.params.case_ref);
  if (response.resp_code === 200) {
    const appData = response.data;
    const closureDate = appData.DateOfRelevantRepresentationClose;
    let dateOfClosure = '';
    if (closureDate != null) {
      const formattedDate = moment(closureDate, 'YYYY-MM-DD').format('DD MMMM YYYY');
      const closeDate = new Date(closureDate);
      const day = dayOfWeekAsString(closeDate.getDay());
      dateOfClosure = day + ' ' + formattedDate;
    }
    req.session.caseRef = req.params.case_ref;
    req.session.projectName = appData.ProjectName;
    req.session.appData = appData;
    res.render(VIEW.OVERVIEW, {
      projectName: appData.ProjectName,
      caseRef: req.session.caseRef,
      appData: appData,
      projectName: appData.ProjectName,
      dateOfClosure: dateOfClosure,
      stage: Status[appData.Stage],
    });
  }
};
