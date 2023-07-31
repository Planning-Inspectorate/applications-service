const logger = require('../../../lib/logger');
const { getPageData } = require('./utils/get-page-data');

const view = 'projects/project-information/view.njk';

const getProjectOverview = (req, res, next) => {
	const {
		locals: { applicationData }
	} = res;

	try {
		return res.render(view, getPageData(applicationData));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectOverview
};
