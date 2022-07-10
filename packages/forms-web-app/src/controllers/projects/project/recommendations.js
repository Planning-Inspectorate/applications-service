const { VIEW } = require('../../../lib/views');

const getProjectRecommendations = async (req, res) => {
	res.render(VIEW.PROJECTS.PROJECT.RECOMMENDATIONS, {
		projectName: req.session.projectName,
		caseRef: req.session.caseRef
	});
};

module.exports = {
	getProjectRecommendations
};
