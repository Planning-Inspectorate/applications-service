const { VIEW } = require('../../lib/views');

exports.getTimetable = async (req, res) => {
	res.render(VIEW.PROJECTS.TIMETABLE, {
		projectName: req.session.projectName,
		caseRef: req.session.caseRef
	});
};
