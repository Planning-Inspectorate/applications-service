const logger = require('../../../../lib/logger');
const { getGetUpdatesUnsubscribedSession } = require('../_session');

const view = 'projects/get-updates/unsubscribed/view.njk';

const getUpdatesUnsubscribedController = (req, res, next) => {
	try {
		const { session } = req;

		if (!getGetUpdatesUnsubscribedSession(session)) {
			throw new Error('Get updates is not unsubscribed');
		}

		return res.render(view, {
			pageHeading: 'Unsubscribe success',
			pageTitle: 'Successfully unsubscribed'
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getUpdatesUnsubscribedController };
