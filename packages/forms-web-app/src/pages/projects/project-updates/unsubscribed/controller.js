const logger = require('../../../../lib/logger');
const { getProjectUpdatesUnsubscribedSession } = require('../_session');

const { getPageData } = require('./utils/get-page-data');

const view = 'projects/project-updates/unsubscribed/view.njk';

const getProjectUpdatesUnsubscribed = (req, res, next) => {
	try {
		const { session } = req;

		if (getProjectUpdatesUnsubscribedSession(session)) return res.render(view, getPageData());
		else throw new Error('Project updates is not unsubscribed');
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getProjectUpdatesUnsubscribed };
