const { VIEW } = require('../../lib/views');

exports.getTimetable = async (req, res) => {
  res.render(VIEW.EXAMINATION.TIMETABLE, {
    projectName: req.session.projectName,
    caseRef: req.session.caseRef,
  });
};
