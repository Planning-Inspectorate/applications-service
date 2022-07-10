const { VIEW } = require('../../../lib/views');

const getProjectTimeLine = async (req, res) => {
	res.render(VIEW.PROJECTS.PROJECT.TIMELINE, {
		caseRef: req.session.caseRef,
		projectName: req.session.projectName
	});
};

module.exports = {
	getProjectTimeLine
};
