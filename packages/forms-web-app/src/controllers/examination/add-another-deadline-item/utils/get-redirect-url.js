const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { selectDeadline, checkYourAnswers }
		}
	}
} = require('../../../../routes/config');

const getRedirectUrl = (addAnotherDeadlineItemValue) => {
	let redirectURl;
	if (addAnotherDeadlineItemValue === 'yes') {
		redirectURl = `${examinationDirectory}${selectDeadline.route}`;
	} else if (addAnotherDeadlineItemValue === 'no') {
		redirectURl = `${examinationDirectory}${checkYourAnswers.route}`;
	}

	if (!redirectURl) throw new Error('No redirect URL for add another deadline item');
	return redirectURl;
};

module.exports = {
	getRedirectUrl
};
