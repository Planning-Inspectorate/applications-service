const { VIEW } = require('../../lib/views');
const { formatDate } = require('../../utils/date-utils');

exports.getStart = async (req, res) => {
  if (req.session.caseRef === undefined) {
    res.redirect(`/${VIEW.PROJECT_SEARCH}`);
  } else {
    const closeDate = req.session.appData.DateOfRelevantRepresentationClose;
    res.render(VIEW.REGISTER.START, {
      projectName: req.session.projectName,
      closeDate: closeDate ? formatDate(closeDate) : '',
    });
  }
};
