const logger = require('../../../lib/logger');
const { getProjectList } = require('../../../services/application.service');
const { getPageData } = require('./utils/get-page-data');

const view = 'projects/project-search/view.njk';

const getProjectSearch = async (req, res, next) => {
	try {
		const projectList = await getProjectList();

		res.render(view, getPageData(projectList));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectSearch
};
