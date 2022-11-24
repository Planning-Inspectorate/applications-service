const { getDeadlineHasInterestedPartyNumber } = require('../../../../session/deadline-session');
// const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { hasInterestedPartyNumber }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListItemHasInterestedPartyNumber = (session) => {
	return {
		actions: {
			items: [
				{
					html: `<form method="post"><button name="fella" type="submit" value="${directory}${hasInterestedPartyNumber.route}">change</button></form>`
				}
			]
		},
		key: { text: 'Interested party number available' },
		value: { html: getDeadlineHasInterestedPartyNumber(session) }
	};
};
// getSummaryListItem(
// 	'Interested party number available',
// 	getDeadlineHasInterestedPartyNumber(session),
// 	`${directory}${hasInterestedPartyNumber.route}?mode=editDetails`
// );

module.exports = { getSummaryListItemHasInterestedPartyNumber };
