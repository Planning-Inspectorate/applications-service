'use strict';

/**
 * Random coordinate generators for property-based tests
 */

function randomLng() {
	return Math.random() * 360 - 180;
}

function randomLat() {
	return Math.random() * 180 - 90;
}

function randomString(minLen = 1, maxLen = 20) {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
	let result = '';
	for (let i = 0; i < len; i++) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;
}

/**
 * Fisher-Yates shuffle for arrays
 */
function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

/**
 * Validate that a coordinate is a valid [lng, lat] pair
 */
function isValidCoordinate(coordinate) {
	if (!Array.isArray(coordinate) || coordinate.length < 2) return false;
	const lng = parseFloat(coordinate[0]);
	const lat = parseFloat(coordinate[1]);
	return !isNaN(lng) && !isNaN(lat);
}

/**
 * Generate random application object for property-based testing
 */
const NUM_ITERATIONS = 100;

function randomApplication() {
	return {
		LongLat: [randomLng(), randomLat()],
		CaseReference: randomString(5, 12),
		ProjectName: randomString(3, 30),
		Stage: Math.floor(Math.random() * 9)
	};
}

function randomValidApp() {
	return {
		LongLat: [randomLng(), randomLat()],
		CaseReference: randomString(5, 12),
		ProjectName: randomString(3, 30),
		Stage: Math.floor(Math.random() * 9)
	};
}

function randomInvalidCoordinate() {
	const invalidTypes = [
		null,
		undefined,
		[],
		[Math.random()],
		['abc', 'def'],
		[NaN, randomLat()],
		[randomLng(), NaN],
		'not-an-array',
		42
	];
	return invalidTypes[Math.floor(Math.random() * invalidTypes.length)];
}

function randomInvalidApp() {
	return {
		LongLat: randomInvalidCoordinate(),
		CaseReference: randomString(5, 12),
		ProjectName: randomString(3, 30),
		Stage: Math.floor(Math.random() * 9)
	};
}

module.exports = {
	randomLng,
	randomLat,
	randomString,
	shuffle,
	isValidCoordinate,
	NUM_ITERATIONS,
	randomApplication,
	randomValidApp,
	randomInvalidCoordinate,
	randomInvalidApp
};
