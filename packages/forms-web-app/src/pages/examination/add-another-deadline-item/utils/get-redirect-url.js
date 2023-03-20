const {
	routesConfig: {
		examination: {
			pages: { selectDeadline, checkYourAnswers }
		}
	}
} = require('../../../../routes/config');

const getRedirectUrl = (addAnotherDeadlineItemValue) => {
	let redirectURl;
	if (addAnotherDeadlineItemValue === 'yes') {
		redirectURl = `${selectDeadline.route}`;
	} else if (addAnotherDeadlineItemValue === 'no') {
		redirectURl = `${checkYourAnswers.route}`;
	}

	if (!redirectURl) throw new Error('No redirect URL for add another deadline item');
	return redirectURl;
};

module.exports = {
	getRedirectUrl
};
