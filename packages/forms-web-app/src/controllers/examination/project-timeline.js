const { Status } = require('../../utils/status');
const { VIEW } = require('../../lib/views');
const logger = require('../../lib/logger');

exports.getProjectTimeLine = async (req, res) => {
  res.render(VIEW.EXAMINATION.PROJECT_TIMELINE, {
    caseRef: req.session.caseRef,
    projectName: req.session.projectName,
  });
};
