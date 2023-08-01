const logger = require('../../../../lib/logger');
const { getGetUpdatesUnsubscribedSession } = require('../_session');

const { getPageData } = require('./utils/get-page-data');

const view = 'projects/get-updates/unsubscribed/view.njk';

const getGetUpdatesUnsubscribed = (req, res, next) => {
	try {
		const { session } = req;

		if (getGetUpdatesUnsubscribedSession(session)) return res.render(view, getPageData());
		else throw new Error('Get updates is not unsubscribed');
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getGetUpdatesUnsubscribed };
