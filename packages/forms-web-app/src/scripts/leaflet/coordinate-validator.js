import { MAP_CONFIG } from './map-config.js';

/** @typedef {[number, number]} Coordinates - [longitude, latitude] array */

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
 * @param {Coordinates} coordinates - [longitude, latitude] array
 * @param {string} projectName - Project name for logging
 * @returns {boolean} True if coordinates are valid
 */
export function validateAndLogCoordinate(coordinates, projectName) {
	/** @type {number} */
	const [lng, lat] = coordinates;

	if (!isValidUKCoordinate(lat, lng)) {
		console.warn(`Skipping invalid coordinates for ${projectName}:`, coordinates);
		return false;
	}

	return true;
}
