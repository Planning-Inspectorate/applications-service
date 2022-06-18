const { VIEW } = require('../../lib/views');

exports.getRecommendations = async (req, res) => {
	res.render(VIEW.PROJECTS.RECOMMENDATIONS, {
		projectName: req.session.projectName,
		caseRef: req.session.caseRef
	});
};
