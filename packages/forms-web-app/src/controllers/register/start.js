const { VIEW } = require('../../lib/views');
const { formatDate } = require('../../utils/date-utils');
const { getAppData } = require('../../services/application.service');
const logger = require('../../lib/logger');

exports.getStart = async (req, res) => {
  const response = await getAppData(req.params.case_ref);
  if (response.resp_code === 200) {
    const appData = response.data;
    req.session.caseRef = req.params.case_ref;
    req.session.projectName = appData.ProjectName;
    req.session.appData = appData;
    const closeDate = req.session.appData.DateOfRelevantRepresentationClose;
    res.render(VIEW.REGISTER.START, {
      projectName: req.session.projectName,
      closeDate: closeDate ? formatDate(closeDate) : '',
    });
  } else if (response.resp_code === 404) {
    logger.warn(`No project found with ID ${req.params.case_ref} for registration`);
    res.status(404).render('error/not-found');
  }
};
