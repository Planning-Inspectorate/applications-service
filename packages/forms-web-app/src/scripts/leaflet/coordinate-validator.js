import { MAP_CONFIG } from './map-config.js';

const DEBUG = process.env.NODE_ENV !== 'production';

/**
 * Validates if coordinates are within UK bounds
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {boolean} True if coordinates are valid
 */
export function isValidUKCoordinate(lat, lng) {
	return (
		lat >= MAP_CONFIG.BOUNDS.MIN_LAT &&
		lat <= MAP_CONFIG.BOUNDS.MAX_LAT &&
		lng >= MAP_CONFIG.BOUNDS.MIN_LNG &&
		lng <= MAP_CONFIG.BOUNDS.MAX_LNG
	);
}

/**
 * Validates coordinates and logs warning if invalid
 * @param {Array<number>} coordinates - [longitude, latitude] array
 * @param {string} projectName - Project name for logging
 * @returns {boolean} True if coordinates are valid
 */
export function validateAndLogCoordinate(coordinates, projectName) {
	const [lng, lat] = coordinates;

	if (!isValidUKCoordinate(lat, lng)) {
		if (DEBUG) console.warn(`Skipping invalid coordinates for ${projectName}:`, coordinates);
		return false;
	}

	return true;
}
