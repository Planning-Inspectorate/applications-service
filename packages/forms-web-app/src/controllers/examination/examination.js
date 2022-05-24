const moment = require('moment');
const { Status } = require('../../utils/status');
const { VIEW } = require('../../lib/views');
const { getAppData } = require('../../services/application.service');
const { formatDate } = require('../../utils/date-utils');

exports.getExamination = async (req, res) => {
  const response = await getAppData(req.params.case_ref);
  if (response.resp_code === 200) {
    const appData = response.data;
    const closureDate = appData.DateOfRelevantRepresentationClose;
    const dateOfClosure = closureDate ? formatDate(closureDate) : '';
    const periodOpen = moment(new Date()).add(-1, 'd').isBefore(closureDate);
    req.session.caseRef = req.params.case_ref;
    req.session.projectName = appData.ProjectName;
    req.session.appData = appData;
    res.render(VIEW.EXAMINATION.EXAMINATION, {
      caseRef: req.session.caseRef,
      appData,
      projectName: appData.ProjectName,
      dateOfClosure,
      stage: Status[appData.Stage],
      periodOpen,
    });
  }
};
