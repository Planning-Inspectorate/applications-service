const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { processSubmission }
		}
	}
} = require('../../../../routes/config');

const getExaminationSubmitCommentsURL = () => {
	return examinationDirectory + processSubmission.route;
};

module.exports = { getExaminationSubmitCommentsURL };
