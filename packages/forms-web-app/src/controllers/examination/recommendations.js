const { VIEW } = require('../../lib/views');

exports.getRecommendations = async (req, res) => {
  res.render(VIEW.EXAMINATION.RECOMMENDATIONS, {
    projectName: req.session.projectName,
    caseRef: req.session.caseRef,
  });
};
