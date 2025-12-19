const logger = require('../../lib/logger');
const { getMapAccessToken } = require('./_utils/get-map-token');
const { getApplications } = require('../../services/applications.service');
const { projectsMapRoute } = require('./config');
const { featureFlag } = require('../../config');

const view = 'projects-map/view.njk';

const getProjectsMapController = async (req, res, next) => {
	try {
		const mapAccessToken = await getMapAccessToken();
		if (!mapAccessToken) {
			throw new Error('Map access token could not be retrieved');
		}

		const { applications } = await getApplications('');

		const mapFeatureFlags = {
			enableClustering: featureFlag.enableProjectsMapClustering,
			enableBoundaries: featureFlag.enableProjectsMapBoundaries,
			enableCustomIcons: featureFlag.enableProjectsMapCustomIcons
		};

		return res.render(view, {
			title: 'Projects map',
			pageTitle: 'Projects map',
			mapAccessToken,
			applications,
			projectsMapRoute,
			mapFeatureFlags
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectsMapController
};
