const logger = require('../../lib/logger');
const { getProjectSearchURL } = require('../project-search/utils/get-project-search-url');
const { getProjectsMapGeoJSON } = require('../../services/projects-map.service');
const { maps: mapConfig } = require('../../config');

const view = 'projects-map/view.njk';
const projectSearchURL = getProjectSearchURL();

/**
 * GET /projects-map
 * Renders projects map with server-side data fetching and configuration
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next middleware
 */
const getProjectsMapController = async (req, res, next) => {
	try {
		logger.info('Loading projects map page...');

		// Fetch GeoJSON from service
		const geojson = await getProjectsMapGeoJSON();

		// Validate GeoJSON structure
		if (!geojson || typeof geojson !== 'object') {
			logger.error('Invalid GeoJSON response: not an object', { geojson });
			return next(new Error('Failed to load map data'));
		}

		if (geojson.type !== 'FeatureCollection') {
			logger.error('Invalid GeoJSON response: missing type FeatureCollection', {
				type: geojson.type
			});
			return next(new Error('Failed to load map data'));
		}

		if (!Array.isArray(geojson.features)) {
			logger.error('Invalid GeoJSON response: features is not an array', {
				features: geojson.features
			});
			return next(new Error('Failed to load map data'));
		}

		logger.info(`Map page loaded with ${geojson.features.length} projects`);

		// Build mapOptions from configuration
		const mapOptions = {
			minZoom: mapConfig.leafletOptions.minZoom,
			maxZoom: mapConfig.leafletOptions.maxZoom,
			center: mapConfig.leafletOptions.center,
			zoom: mapConfig.leafletOptions.zoom,
			attributionControl: mapConfig.leafletOptions.attributionControl
		};

		// Add bounds restriction if enabled
		if (mapConfig.restrictToUk.enabled) {
			mapOptions.maxBounds = mapConfig.restrictToUk.bounds;
			mapOptions.maxBoundsViscosity = mapConfig.restrictToUk.viscosity;
			logger.info('Map bounds restricted to UK');
		}

		// Build configuration object for client-side script
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
			markers: geojson.features,
			clustered: mapConfig.display.clustered,
			totalProjects: geojson.features.length
		};

		// Render view with map configuration
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
