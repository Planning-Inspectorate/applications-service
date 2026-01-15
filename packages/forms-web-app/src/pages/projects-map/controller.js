const logger = require('../../lib/logger');
const { getProjectSearchURL } = require('../project-search/utils/get-project-search-url');
const { getProjectsMapGeoJSON } = require('../../services/projects-map.service');
const { maps: mapConfig } = require('../../config');

const view = 'projects-map/view.njk';
const projectSearchURL = getProjectSearchURL();

/**
 * GET /projects-map
 * Renders the projects map page with GeoJSON data and Leaflet configuration.
 *
 * @async
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express error handler
 */
const getProjectsMapController = async (req, res, next) => {
	try {
		const geojson = await getProjectsMapGeoJSON();

		// Leaflet map viewport configuration (zoom, center, bounds)
		const mapOptions = {
			minZoom: mapConfig.leafletOptions.minZoom,
			maxZoom: mapConfig.leafletOptions.maxZoom,
			center: mapConfig.leafletOptions.center,
			zoom: mapConfig.leafletOptions.zoom,
			attributionControl: mapConfig.leafletOptions.attributionControl
		};

		// Configuration passed to client for map initialization
		const renderedMapConfig = {
			elementId: mapConfig.display.elementId,
			mapOptions,
			tileLayer: {
				url: mapConfig.tileLayer.url,
				tokenEndpoint: mapConfig.tileLayer.tokenEndpoint,
				options: {
					maxZoom: mapConfig.tileLayer.maxZoom,
					attribution: mapConfig.tileLayer.attribution
				}
			},
			crs: mapConfig.crs,
			markers: geojson.features,
			clustered: mapConfig.display.clustered,
			totalProjects: geojson.features.length
		};

		res.render(view, {
			mapConfig: renderedMapConfig,
			projectSearchURL
		});
	} catch (error) {
		logger.error('Error in getProjectsMapController:', error);
		next(error);
	}
};

module.exports = {
	getProjectsMapController
};
