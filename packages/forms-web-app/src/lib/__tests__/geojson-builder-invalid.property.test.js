'use strict';

const { GeoJSONBuilder } = require('../geojson-builder');

/**
 * Property 4: GeoJSON Builder excludes invalid coordinates
 * Validates: Requirements 6.4
 *
 * For any set of application records where some have missing, null, non-numeric,
 * or incomplete LongLat values, the build() output SHALL contain only features
 * corresponding to records with valid [lng, lat] coordinates (both numeric,
 * array length >= 2), and the count of output features SHALL equal the count
 * of valid input records.
 *
 * Uses randomized inputs (no external libraries) to verify exclusion invariants.
 */

const NUM_ITERATIONS = 100;

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

function isValidCoordinate(coordinate) {
	if (!Array.isArray(coordinate) || coordinate.length < 2) return false;
	const lng = parseFloat(coordinate[0]);
	const lat = parseFloat(coordinate[1]);
	return !isNaN(lng) && !isNaN(lat);
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

/** Shuffle an array in place (Fisher-Yates) */
function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

describe('Property 4: GeoJSON Builder excludes invalid coordinates', () => {
	it('output feature count equals count of valid input records', () => {
		for (let i = 0; i < NUM_ITERATIONS; i++) {
			const validCount = Math.floor(Math.random() * 8);
			const invalidCount = Math.floor(Math.random() * 8);
			const apps = shuffle([
				...Array.from({ length: validCount }, randomValidApp),
				...Array.from({ length: invalidCount }, randomInvalidApp)
			]);

			const result = new GeoJSONBuilder().addApplications(apps).build();
			const expectedValidCount = apps.filter((app) => isValidCoordinate(app.LongLat)).length;

			expect(result.features).toHaveLength(expectedValidCount);
		}
	});

	it('only records with valid [lng, lat] coordinates appear in output', () => {
		for (let i = 0; i < NUM_ITERATIONS; i++) {
			const validCount = Math.floor(Math.random() * 6) + 1;
			const invalidCount = Math.floor(Math.random() * 6) + 1;
			const apps = shuffle([
				...Array.from({ length: validCount }, randomValidApp),
				...Array.from({ length: invalidCount }, randomInvalidApp)
			]);

			const result = new GeoJSONBuilder().addApplications(apps).build();

			for (const feature of result.features) {
				const [lng, lat] = feature.geometry.coordinates;
				expect(typeof lng).toBe('number');
				expect(typeof lat).toBe('number');
				expect(isNaN(lng)).toBe(false);
				expect(isNaN(lat)).toBe(false);
			}
		}
	});

	it('output features correspond only to valid input records in order', () => {
		for (let i = 0; i < NUM_ITERATIONS; i++) {
			const validCount = Math.floor(Math.random() * 6) + 1;
			const invalidCount = Math.floor(Math.random() * 6) + 1;
			const apps = shuffle([
				...Array.from({ length: validCount }, randomValidApp),
				...Array.from({ length: invalidCount }, randomInvalidApp)
			]);

			const result = new GeoJSONBuilder().addApplications(apps).build();
			const validRecords = apps.filter((app) => isValidCoordinate(app.LongLat));

			expect(result.features).toHaveLength(validRecords.length);

			for (let j = 0; j < result.features.length; j++) {
				const feature = result.features[j];
				const expectedRecord = validRecords[j];
				const expectedLng = parseFloat(expectedRecord.LongLat[0]);
				const expectedLat = parseFloat(expectedRecord.LongLat[1]);

				expect(feature.geometry.coordinates[0]).toBe(expectedLng);
				expect(feature.geometry.coordinates[1]).toBe(expectedLat);
			}
		}
	});
});
