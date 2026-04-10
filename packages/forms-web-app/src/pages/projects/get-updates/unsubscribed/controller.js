const logger = require('../../../../lib/logger');
const { getGetUpdatesUnsubscribedSession } = require('../_session');
const { isLangWelsh } = require('../../../_utils/is-lang-welsh');

const view = 'projects/get-updates/unsubscribed/view.njk';

const getUpdatesUnsubscribedController = (req, res, next) => {
	try {
		const { session, i18n } = req;

		if (!getGetUpdatesUnsubscribedSession(session)) {
			throw new Error('Get updates is not unsubscribed');
		}

		return res.render(view, {
			pageHeading: 'Unsubscribe success',
			pageTitle: 'Successfully unsubscribed',
			isWelsh: isLangWelsh(i18n.language)
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getUpdatesUnsubscribedController };
