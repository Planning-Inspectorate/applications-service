const { getPageData } = require('./utils/get-page-data');
const {
	routesConfig: {
		examination: {
			pages: { submissionError }
		}
	}
} = require('../../../routes/config');

const getSubmissionError = (req, res) => {
	try {
		const { session, query } = req;
		const pageData = getPageData(session, query);

		return res.render(submissionError.view, pageData);
	} catch {
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getSubmissionError
};
