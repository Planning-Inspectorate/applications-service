const {
	routesConfig: {
		examination: {
			pages: { applicant }
		}
	}
} = require('../../routes/config');

const pageData = {
	pageTitle: applicant.name,
	title: applicant.name
};

const getApplicant = (req, res) => {
	res.render(applicant.view, pageData);
};

module.exports = {
	getApplicant
};
