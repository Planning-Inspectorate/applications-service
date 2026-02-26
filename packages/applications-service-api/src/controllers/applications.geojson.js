const { StatusCodes } = require('http-status-codes');
const { getAllApplications } = require('../services/application.backoffice.service');
const { stageApiToLabel, stageNameFromValue } = require('../utils/application.mapper');

/**
 * Maps a single application to a GeoJSON Feature.
 *
 * IMPORTANT: Projects without valid longLat coordinates are intentionally excluded
 * from the GeoJSON response. This filtering happens in `toGeoJSONFeature` — if longLat
 * is missing or empty, null is returned and the caller must filter it out.
 *
 * When project boundary/polygon data becomes available (future ticket), this function
 * should be extended to include a `geometry` of type `Polygon` alongside or instead
 * of the current `Point` geometry.
 *
 * @param {Object} application - Mapped application object from getAllApplications
 * @returns {Object|null} GeoJSON Feature or null if coordinates are unavailable
 */
const toGeoJSONFeature = (application) => {
	// Support both NI camelCase and BO legacy PascalCase shapes
	const longLat = application.longLat || application.LongLat;
	const caseReference = application.caseReference || application.CaseReference;
	const projectName = application.projectName || application.ProjectName;
	const stage = application.stage ?? application.Stage;

	// longLat is an array of [longitude, latitude] strings derived from LongLat,
	// LatLong, or northing/easting via OSPoint. Exclude if missing or incomplete.
	if (!longLat || longLat.length < 2 || !longLat[0] || !longLat[1]) return null;

	const longitude = parseFloat(longLat[0]);
	const latitude = parseFloat(longLat[1]);

	if (isNaN(longitude) || isNaN(latitude)) return null;

	return {
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [longitude, latitude]
		},
		properties: {
			caseReference,
			projectName,
			// Normalise: numeric stage (BO legacy) → api key → display label
			stage:
				stageApiToLabel[typeof stage === 'number' ? stageNameFromValue(stage) : stage] || stage,
			projectURL: `/projects/${caseReference}`
		}
	};
};

/**
 * GET /api/v1/applications/geojson
 *
 * Returns a GeoJSON FeatureCollection of all projects matching the given filters.
 * Accepts the same query params as GET /api/v1/applications (region, sector, stage, searchTerm).
 *
 * Projects without valid coordinates are silently excluded — see toGeoJSONFeature for details.
 * No pagination is applied; all matching projects are returned for map rendering.
 */
const getApplicationsGeoJSON = async (req, res) => {
	// Request all matching applications without pagination by omitting page/size
	const { applications } = await getAllApplications(req.query);

	const features = applications.map(toGeoJSONFeature).filter(Boolean);

	res.status(StatusCodes.OK).json({
		type: 'FeatureCollection',
		features
	});
};

module.exports = { getApplicationsGeoJSON };
