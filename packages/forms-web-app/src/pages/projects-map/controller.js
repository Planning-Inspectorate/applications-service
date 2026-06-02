const logger = require('../../lib/logger');
const { Readable } = require('stream');
const { maps } = require('../../config');
const { getApplications } = require('../../services/applications.service');
const { getMapAccessToken } = require('../_services');
const { getFilters } = require('../_utils/filters/get-filters');
const {
	projectsMapI18nNamespace,
	projectsMapRoute,
	projectsMapViewPath,
	geoJsonMimeType
} = require('./config');
const {
	getProjectSearchQueryString
} = require('../project-search/utils/get-project-search-query-string');
const { getProjectSearchURL } = require('../project-search/utils/get-project-search-url');
const { getRelatedContentLinks } = require('../project-search/utils/get-related-content-links');
const { getProjectsMapURL } = require('./utils/get-projects-map-url');
const { getGeoJsonDownloadURL } = require('./utils/get-master-geo-json-download-url');
const { getGeoJsonURL } = require('./utils/get-master-geo-json-url');
const { queryStringBuilder } = require('../../utils/query-string-builder');
const { GeoJSONBuilder } = require('../../lib/geojson-builder');

/**
 * GET /projects-map
 * Renders the interactive map view with filtered project markers.
 * Fetches applications and map token in parallel, builds GeoJSON for map rendering.
 */
const getProjectsMapController = async (req, res, next) => {
	try {
		const { i18n, query } = req;

		// Redirect to clean URL if only searchTerm with no value exists
		const { searchTerm, ...filters } = query;
		if (Object.keys(filters).length === 0 && !searchTerm && req.url.includes('?')) {
			return res.redirect(projectsMapRoute);
		}

		// Fetch applications and OS Maps token concurrently
		const [{ applications, filters: availableFilters }, mapAccessToken] = await Promise.all([
			getApplications(getProjectSearchQueryString(query)),
			getMapAccessToken()
		]);

		// Build query string from filters
		const queryParams = searchTerm ? { ...filters, searchTerm } : filters;
		const queryString = queryStringBuilder(queryParams, Object.keys(queryParams), true);

		const mapGeoJSON = new GeoJSONBuilder().addApplications(applications).build();

		res.render(projectsMapViewPath, {
			...getFilters(i18n, query, availableFilters, projectsMapI18nNamespace, getProjectsMapURL()),
			mapAccessToken,
			mapGeoJSON: JSON.stringify(mapGeoJSON),
			geoJsonMapDisplayURL: getGeoJsonURL(),
			projectSearchURL: getProjectSearchURL(),
			downloadBoundariesURL: getGeoJsonDownloadURL(),
			relatedContentLinks: getRelatedContentLinks(i18n, 'projectsMap'),
			query,
			queryString,
			showFilters: !!req.session.projectsMapShowFilters
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

/**
 * POST /projects-map
 * Toggles filter panel visibility and redirects back with preserved query params.
 * Reads current state from filterToggleValue, flips it, stores in session.
 * Extracts query string from referrer to maintain active filters.
 */
const postProjectsMapController = (req, res, next) => {
	try {
		// Flip the boolean: 'true' → false, anything else → true
		req.session.projectsMapShowFilters = req.body.filterToggleValue !== 'true';

		// Extract referrer URL from request
		const referrer = req.get('Referrer');
		let queryString = '';

		if (referrer) {
			try {
				const referrerUrl = new URL(referrer, 'http://localhost');
				if (referrerUrl.pathname === projectsMapRoute) {
					queryString = referrerUrl.search.slice(1);
				}
			} catch {
				// Invalid referrer URL — fall through with empty queryString
			}
		}

		res.redirect(`${projectsMapRoute}${queryString ? `?${queryString}` : ''}`);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

/**
 * GET /projects-map/download-boundaries
 * Streams the master GeoJSON file to the browser as a download.
 */
const downloadMasterGeoJsonController = async (req, res, next) => {
	try {
		const response = await fetch(maps.masterGeoJsonUrl);

		if (!response.ok) {
			throw new Error(`Failed to fetch GeoJSON: ${response.status}`);
		}

		res.setHeader('Content-Disposition', 'attachment; filename="all-project-boundaries.geojson"');

		res.setHeader('Content-Type', geoJsonMimeType);

		if (!response.body) {
			throw new Error('geoJson response body missing');
		}

		Readable.fromWeb(response.body).pipe(res);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const getMasterGeoJsonController = async (req, res, next) => {
	try {
		// Retrieve blob metadata without downloading the full GeoJSON file.
		// This allows us to compare ETags and avoid unnecessarily transferring
		// a potentially large master boundary file if the browser already has
		// the latest version cached
		const headResponse = await fetch(maps.masterGeoJsonUrl, {
			method: 'HEAD'
		});

		if (!headResponse.ok) {
			throw new Error(`Failed to fetch GeoJSON headers: ${headResponse.status}`);
		}

		const etag = headResponse.headers.get('etag');
		const lastModified = headResponse.headers.get('last-modified');

		// Instruct browsers to cache the response but revalidate before use.
		// If the GeoJSON has not changed, we can return 304 Not Modified and
		// the browser will reuse its cached copy rather than downloading the
		// entire file again
		res.set('Cache-Control', 'public, max-age=0, must-revalidate');

		if (etag && req.headers['if-none-match'] === etag) {
			logger.info('Returning 304 for cached master geojson');

			return res.status(304).send();
		}

		if (etag) {
			res.setHeader('ETag', etag);
		}

		if (lastModified) {
			res.setHeader('Last-Modified', lastModified);
		}

		// GeoJSON has changed (or browser has no cached copy), so download
		// the latest version from blob storage and return it to the client.
		const response = await fetch(maps.masterGeoJsonUrl);

		if (!response.ok) {
			throw new Error(`Failed to fetch GeoJSON: ${response.status}`);
		}

		const geoJson = await response.json();

		return res.json(geoJson);
	} catch (error) {
		logger.error(error);

		next(error);
	}
};

module.exports = {
	getProjectsMapController,
	postProjectsMapController,
	downloadMasterGeoJsonController,
	getMasterGeoJsonController
};
