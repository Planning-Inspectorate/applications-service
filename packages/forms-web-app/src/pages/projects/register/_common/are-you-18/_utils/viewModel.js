const { keys } = require('../../../../../../controllers/register/common/keys');
const { getPageTitle } = require('../../../../../../controllers/register/common/common-view-model');

const getViewModel = (i18n) => {
	const pageHeading = i18n.t('register.areYou18.pageHeading');
	const hint = i18n.t('register.areYou18.hint');
	const pageTitle = getPageTitle(i18n);
	const hiddenText = {
		yesHiddenText: i18n.t('register.areYou18.yesHiddenText'),
		noHiddenText: i18n.t('register.areYou18.noHiddenText')
	};

	return {
		[keys.myself]: {
			pageTitle: pageHeading + pageTitle[keys.myself],
			hint: hint,
			pageHeading: pageHeading,
			...hiddenText
		},
		[keys.organisation]: {
			pageTitle: pageHeading + pageTitle[keys.organisation],
			hint: hint,
			pageHeading: pageHeading,
			...hiddenText
		}
	};
};

module.exports = {
	getViewModel
};
