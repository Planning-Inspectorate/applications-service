const {
	getDeadlineInterestedPartyNumber
} = require('../../../../session/deadline-session/deadline-interested-party-number');
// const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { yourInterestedPartyNumber }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListItemInterestedPartyNumber = (session) => {
	return {
		actions: {
			items: [
				{
					html: `<form method="post"><button name="fella" type="submit" value="${directory}${yourInterestedPartyNumber.route}">change</button></form>`
				}
			]
		},
		key: { text: 'Interested party number available' },
		value: { html: getDeadlineInterestedPartyNumber(session) }
	};
};
// getSummaryListItem(
// 	'Interested party number',
// 	getDeadlineInterestedPartyNumber(session),
// 	`${directory}${yourInterestedPartyNumber.route}?mode=editDetails`
// );

module.exports = { getSummaryListItemInterestedPartyNumber };
