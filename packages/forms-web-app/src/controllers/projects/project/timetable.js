const { VIEW } = require('../../../lib/views');

const getProjectTimetable = async (req, res) => {
	res.render(VIEW.PROJECTS.TIMETABLE, {
		projectName: req.session.projectName,
		caseRef: req.session.caseRef
	});
};

module.exports = {
	getProjectTimetable
};
