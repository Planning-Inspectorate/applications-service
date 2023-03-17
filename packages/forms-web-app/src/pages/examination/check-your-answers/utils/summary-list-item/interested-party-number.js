const { getDeadlineDetailsInterestedPartyNumber } = require('../../../_session/deadline');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');

const {
	routesConfig: {
		examination: {
			directory,
			pages: { yourInterestedPartyNumber }
		}
	}
} = require('../../../../../routes/config');

const { editQuery } = require('../../../../../controllers/utils/queryMode');
const getSummaryListItemInterestedPartyNumber = (session) =>
	getSummaryListItem(
		'Interested party number',
		getDeadlineDetailsInterestedPartyNumber(session),
		`${directory}${yourInterestedPartyNumber.route}${editQuery}`
	);

module.exports = { getSummaryListItemInterestedPartyNumber };
