const logger = require('../../lib/logger');
const { getAllProjectList } = require('../../lib/application-api-wrapper');
const { getProjectSearchURL } = require('../project-search/utils/get-project-search-url');

const view = 'projects-map/view.njk';
const projectSearchURL = getProjectSearchURL();

const getProjectsMapController = async (req, res, next) => {
	try {
		logger.info('Starting GeoJSON generation from database...');

		const projectsResponse = await getAllProjectList();

		if (!projectsResponse || !projectsResponse.data) {
			throw new Error('Failed to fetch projects from database');
		}

		logger.info('GeoJSON generation completed.');

		logger.info('Fetching Map access token...');

		// Render the view with the project search URL
		res.render(view, { projectsResponse, projectSearchURL });
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectsMapController
};
