const { VIEW } = require('../../lib/views');

const getProjectsTimeLine = async (req, res) => {
	res.render(VIEW.PROJECTS.TIMELINE, {
		caseRef: req.session.caseRef,
		projectName: req.session.projectName
	});
};

module.exports = {
	getProjectsTimeLine
};
