const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { enterComment, selectFile }
		}
	}
} = require('../../../../routes/config');

const getRedirectUrl = (options, value) => {
	let redirectUrl;

	if (options[1].value === value) redirectUrl = `${examinationDirectory + enterComment.route}`;
	else if (options[2].value === value) redirectUrl = `${examinationDirectory + selectFile.route}`;
	else if (options[3].value === value) redirectUrl = `${examinationDirectory + enterComment.route}`;

	if (!redirectUrl) throw new Error('No redirect url found');

	return redirectUrl;
};

module.exports = { getRedirectUrl };
