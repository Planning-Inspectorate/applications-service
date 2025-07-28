const { getDeadlineDetailsInterestedPartyNumber } = require('../../../_session/deadline');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');

const {
	routesConfig: {
		examination: {
			pages: { yourInterestedPartyNumber }
		}
	}
} = require('../../../../../routes/config');

const { editQuery } = require('../../../../../controllers/utils/queryMode');
const getSummaryListItemInterestedPartyNumber = (i18n, session) =>
	getSummaryListItem(
		i18n,
		i18n.t('examination.checkYourAnswers.details.summaryListHeading2'),
		getDeadlineDetailsInterestedPartyNumber(session),
		`${yourInterestedPartyNumber.route}${editQuery}`
	);

module.exports = { getSummaryListItemInterestedPartyNumber };
