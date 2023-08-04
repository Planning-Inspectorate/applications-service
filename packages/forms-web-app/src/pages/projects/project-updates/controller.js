const logger = require('../../../lib/logger');
const { getProjectUpdatesData } = require('../../services');
const { getPageData } = require('./utils/get-page-data');

const getProjectUpdatesController = async (req, res, next) => {
	try {
		const { locals } = res;
		const { caseRef } = locals;

		const projectUpdates = await getProjectUpdatesData(caseRef);

		return res.render('projects/project-updates/view.njk', getPageData(locals, projectUpdates));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getProjectUpdatesController };
