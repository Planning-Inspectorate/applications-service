const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { evidenceOrComment, personalInformationComment, selectFile }
		}
	}
} = require('../../../../routes/config');

const getRedirectUrl = (submissionType) => {
	let redirectUrl;
	if (evidenceOrComment.options[1].value === submissionType)
		redirectUrl = `${examinationDirectory}${personalInformationComment.route}`;
	else if (evidenceOrComment.options[3].value === submissionType)
		redirectUrl = `${examinationDirectory}${selectFile.route}`;

	if (!redirectUrl) throw new Error('Value does not equal a submission type');

	return redirectUrl;
};

module.exports = {
	getRedirectUrl
};
