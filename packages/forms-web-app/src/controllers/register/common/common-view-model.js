const { keys } = require('./keys');

const commonPageTitle =
	'- Register to have your say about a national infrastructure project - National Infrastructure Planning';

const pageTitle = {
	[keys.myself]: ` - Registering for myself ${commonPageTitle}`,
	[keys.organisation]: ` - Registering for an organisation ${commonPageTitle}`,
	[keys.agent]: ` - Registering on behalf of someone else ${commonPageTitle}`
};

const getPageTitle = (i18n) => {
	const commonPageTitle = '- ' + i18n.t('register.index.pageTitle');

	return {
		[keys.myself]: ' - ' + i18n.t('register.myself.pageTitleSuffix') + ' ' + commonPageTitle,
		[keys.organisation]:
			' - ' + i18n.t('register.organisation.pageTitleSuffix') + ' ' + commonPageTitle,
		[keys.agent]: ' - ' + i18n.t('register.agent.pageTitleSuffix') + ' ' + commonPageTitle
	};
};
module.exports = {
	pageTitle,
	getPageTitle
};
