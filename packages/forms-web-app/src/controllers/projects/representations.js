const { VIEW } = require('../../lib/views');

exports.getRepresentations = async (req, res) => {
  res.render(VIEW.PROJECTS.REPRESENTATIONS, {
    projectName: req.session.projectName,
    caseRef: req.session.caseRef,
  });
};
