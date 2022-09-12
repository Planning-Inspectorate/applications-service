const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				applicant,
				hasInterestedPartyNumber: { route: hasInterestedPartyNumberRoute }
			}
		}
	}
} = require('../../routes/config');

const pageData = {
	backLinkUrl: `${examinationDirectory + hasInterestedPartyNumberRoute}`,
	id: applicant.id,
	pageTitle: applicant.name('applicant name'),
	title: applicant.name('applicant name')
};

const getApplicant = async (req, res) => {
	res.render(applicant.view, pageData);
};

const postApplicant = async (req, res) => {
	res.render(applicant.view, pageData);
};

module.exports = {
	getApplicant,
	postApplicant
};
