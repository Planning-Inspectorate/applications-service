const { VIEW } = require('../../lib/views');

exports.getProjectTimeLine = async (req, res) => {
  res.render(VIEW.EXAMINATION.PROJECT_TIMELINE, {
    caseRef: req.session.caseRef,
    projectName: req.session.projectName,
  });
};
