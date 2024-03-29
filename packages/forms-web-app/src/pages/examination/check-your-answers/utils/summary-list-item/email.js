const { getDeadlineDetailsEmail } = require('../../../_session/deadline');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { editQuery } = require('../../../../../controllers/utils/queryMode');

const {
	routesConfig: {
		examination: {
			pages: { email }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListItemEmail = (session) =>
	getSummaryListItem(
		'Email Address',
		getDeadlineDetailsEmail(session),
		`${email.route}${editQuery}`
	);

module.exports = { getSummaryListItemEmail };
