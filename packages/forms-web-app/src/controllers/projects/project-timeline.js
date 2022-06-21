const { VIEW } = require('../../lib/views');

exports.getProjectTimeLine = async (req, res) => {
	res.render(VIEW.PROJECTS.PROJECT_TIMELINE, {
		caseRef: req.session.caseRef,
		projectName: req.session.projectName
	});
};
