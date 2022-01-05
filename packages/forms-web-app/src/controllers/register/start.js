const { VIEW } = require('../../lib/views');

exports.getStart = async (req, res) => {
  if (req.session.caseRef === undefined) {
    res.redirect(`/${VIEW.PROJECT_SEARCH}`);
  } else {
    res.render(VIEW.REGISTER.START, {
      projectName: req.session.projectName,
      closeDate: req.session.appData.DateOfRelevantRepresentationCloseFormatted,
    });
  }
};
