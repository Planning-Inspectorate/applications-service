const {
	routesConfig: {
		examination: {
			pages: { submissionComplete }
		}
	}
} = require('../../../routes/config');

const getSubmissionComplete = (req, res) => {
	return res.render(submissionComplete.view);
};

module.exports = {
	getSubmissionComplete
};
