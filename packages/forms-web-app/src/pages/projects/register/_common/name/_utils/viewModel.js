const { keys } = require('../../../../../../controllers/register/common/keys');
const { getPageTitle } = require('../../../../../../controllers/register/common/common-view-model');

const getViewModel = (i18n) => {
	const pageHeading = i18n.t('register.name.pageHeading');
	const hint = i18n.t('register.name.hint');
	const pageTitle = getPageTitle(i18n);

	return {
		[keys.myself]: {
			pageTitle: pageHeading + pageTitle[keys.myself],
			pageHeading: pageHeading,
			hint: hint
		},
		[keys.organisation]: {
			pageTitle: pageHeading + pageTitle[keys.organisation],
			pageHeading: pageHeading
		},
		[keys.agent]: {
			pageTitle: pageHeading + pageTitle[keys.agent],
			pageHeading: pageHeading
		}
	};
};

module.exports = {
	getViewModel
};
