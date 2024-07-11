const {
	routesConfig: {
		examination: {
			pages: { nameAgent, nameMyself, nameOrganisation }
		}
	}
} = require('../../../../routes/config');

const getTitles = (i18n, route) => {
	let pageTitle = '';
	let title = '';

	if (route === nameAgent.route) {
		pageTitle = i18n.t('examination.name.agent.title');
		title = i18n.t('examination.name.agent.heading1');
	} else if (route === nameMyself.route) {
		pageTitle = i18n.t('examination.name.myself.title');
		title = i18n.t('examination.name.myself.heading1');
	} else if (route === nameOrganisation.route) {
		pageTitle = i18n.t('examination.name.organisation.title');
		title = i18n.t('examination.name.organisation.heading1');
	}

	return { pageTitle, title };
};

module.exports = { getTitles };
