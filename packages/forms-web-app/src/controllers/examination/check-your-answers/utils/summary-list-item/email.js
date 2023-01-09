const { getDeadlineDetailsEmail } = require('../../../session/deadline');
const { getSummaryListItem } = require('../../../../utils/get-summary-list-item');
const { editQuery } = require('../../../../utils/queryMode');

const {
	routesConfig: {
		examination: {
			directory,
			pages: { email }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListItemEmail = (session) =>
	getSummaryListItem(
		'Email Address',
		getDeadlineDetailsEmail(session),
		`${directory}${email.route}${editQuery}`
	);

module.exports = { getSummaryListItemEmail };
