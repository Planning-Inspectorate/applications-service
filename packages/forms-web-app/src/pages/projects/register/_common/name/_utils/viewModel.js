const { keys } = require('../../../../../../controllers/register/common/keys');
const { getPageTitle } = require('../../../../../../controllers/register/common/common-view-model');

const getViewModel = (i18n) => {
	const pageTitlePrefix = i18n.t('register.name.pageHeading');
	const hint = i18n.t('register.name.hint');
	const pageTitle = getPageTitle(i18n);
	return {
		pageHeading: i18n.t('register.name.pageHeading'),
		[keys.myself]: {
			pageTitle: pageTitlePrefix + pageTitle[keys.myself],
			hint: hint
		},
		[keys.organisation]: {
			pageTitle: pageTitlePrefix + pageTitle[keys.organisation]
		},
		[keys.agent]: {
			pageTitle: pageTitlePrefix + pageTitle[keys.agent]
		}
	};
};

module.exports = {
	getViewModel
};
