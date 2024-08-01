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

const getSummaryListItemEmail = (i18n, session) =>
	getSummaryListItem(
		i18n,
		i18n.t('examination.checkYourAnswers.details.summaryListHeading6'),
		getDeadlineDetailsEmail(session),
		`${email.route}${editQuery}`
	);

module.exports = { getSummaryListItemEmail };
