const {
	getDeadlineDetailsSubmittingFor,
	getDeadlineDetailsName
} = require('../../../_session/deadline');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const {
	routesConfig: {
		examination: {
			pages: { nameMyself, nameAgent, nameOrganisation }
		}
	}
} = require('../../../../../routes/config');
const { editQuery } = require('../../../../../controllers/utils/queryMode');
const { submittingForOptionValues } = require('../../../submitting-for/config');

const getSummaryListItemName = (i18n, session) => {
	switch (getDeadlineDetailsSubmittingFor(session)) {
		case submittingForOptionValues[1]:
			return {
				name: i18n.t('examination.checkYourAnswers.details.summaryListHeading5.fullName'),
				url: `${nameMyself.route}${editQuery}`
			};
		case submittingForOptionValues[2]:
			return {
				name: i18n.t('examination.checkYourAnswers.details.summaryListHeading5.orgName'),
				url: `${nameOrganisation.route}${editQuery}`
			};
		case submittingForOptionValues[3]:
			return {
				name: i18n.t('examination.checkYourAnswers.details.summaryListHeading5.behalf'),
				url: `${nameAgent.route}${editQuery}`
			};
		default:
			throw new Error('Summary list item name can not be assigned');
	}
};

const getSummaryListName = (i18n, session) => {
	const { name, url } = getSummaryListItemName(i18n, session);
	return getSummaryListItem(i18n, name, getDeadlineDetailsName(session), url);
};

module.exports = { getSummaryListName };
