const {
	routesConfig: {
		examination: {
			pages: { processSubmission }
		}
	}
} = require('../../../../routes/config');

const getExaminationSubmitCommentsURL = () => {
	return processSubmission.route;
};

module.exports = { getExaminationSubmitCommentsURL };
