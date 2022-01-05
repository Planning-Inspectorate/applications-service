const { VIEW } = require('../../lib/views');

exports.getRepresentations = async (req, res) => {
  res.render(VIEW.EXAMINATION.REPRESENTATIONS, {
    projectName: req.session.projectName,
    caseRef: req.session.caseRef,
  });
};
