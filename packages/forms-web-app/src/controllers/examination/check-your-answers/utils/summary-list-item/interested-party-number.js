const { getDeadlineDetailsInterestedPartyNumber } = require('../../../session/deadline');
const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');

const {
	routesConfig: {
		examination: {
			directory,
			pages: { yourInterestedPartyNumber }
		}
	}
} = require('../../../../../routes/config');

const { editQuery } = require('../../../../utils/queryMode');
const getSummaryListItemInterestedPartyNumber = (session) =>
	getSummaryListItem(
		'Interested party number',
		getDeadlineDetailsInterestedPartyNumber(session),
		`${directory}${yourInterestedPartyNumber.route}${editQuery}`
	);

module.exports = { getSummaryListItemInterestedPartyNumber };
