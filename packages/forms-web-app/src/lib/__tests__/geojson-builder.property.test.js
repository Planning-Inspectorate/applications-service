'use strict';

const { GeoJSONBuilder } = require('../geojson-builder');

/**
 * Property 3: GeoJSON Builder round-trip
 * Validates: Requirements 6.1, 6.2, 6.3
 *
 * For any sequence of addApplications and addPoint calls with valid coordinates,
 * the build() output SHALL be a valid GeoJSON FeatureCollection whose feature count
 * equals the total number of valid inputs added, and each feature's coordinates
 * SHALL match the corresponding input coordinate.
 *
 * Uses randomized inputs (no external libraries) to verify round-trip invariants.
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

function randomApplication() {
	return {
		LongLat: [randomLng(), randomLat()],
		CaseReference: randomString(5, 12),
		ProjectName: randomString(3, 30),
		Stage: Math.floor(Math.random() * 9)
	};
}

describe('GeoJSON Builder - Property 3: Round-trip', () => {
	it('build() feature count equals the number of valid application records added', () => {
		for (let i = 0; i < NUM_ITERATIONS; i++) {
			const count = Math.floor(Math.random() * 20);
			const applications = Array.from({ length: count }, randomApplication);

			const builder = new GeoJSONBuilder();
			const result = builder.addApplications(applications).build();

			expect(result.type).toBe('FeatureCollection');
			expect(result.features).toHaveLength(count);
		}
	});

	it('each feature coordinate matches the corresponding input application LongLat', () => {
		for (let i = 0; i < NUM_ITERATIONS; i++) {
			const count = Math.floor(Math.random() * 15) + 1;
			const applications = Array.from({ length: count }, randomApplication);

			const builder = new GeoJSONBuilder();
			const result = builder.addApplications(applications).build();

			for (let j = 0; j < applications.length; j++) {
				const inputLng = parseFloat(applications[j].LongLat[0]);
				const inputLat = parseFloat(applications[j].LongLat[1]);
				const [outputLng, outputLat] = result.features[j].geometry.coordinates;

				expect(outputLng).toBe(inputLng);
				expect(outputLat).toBe(inputLat);
			}
		}
	});

	it('build() feature count equals the number of valid addPoint calls', () => {
		for (let i = 0; i < NUM_ITERATIONS; i++) {
			const count = Math.floor(Math.random() * 20);
			const coordinates = Array.from({ length: count }, () => [randomLng(), randomLat()]);

			const builder = new GeoJSONBuilder();
			for (const coord of coordinates) {
				builder.addPoint(coord);
			}
			const result = builder.build();

			expect(result.type).toBe('FeatureCollection');
			expect(result.features).toHaveLength(count);
		}
	});

	it('each addPoint feature coordinate matches the corresponding input', () => {
		for (let i = 0; i < NUM_ITERATIONS; i++) {
			const count = Math.floor(Math.random() * 15) + 1;
			const coordinates = Array.from({ length: count }, () => [randomLng(), randomLat()]);

			const builder = new GeoJSONBuilder();
			for (const coord of coordinates) {
				builder.addPoint(coord);
			}
			const result = builder.build();

			for (let j = 0; j < coordinates.length; j++) {
				const inputLng = parseFloat(coordinates[j][0]);
				const inputLat = parseFloat(coordinates[j][1]);
				const [outputLng, outputLat] = result.features[j].geometry.coordinates;

				expect(outputLng).toBe(inputLng);
				expect(outputLat).toBe(inputLat);
			}
		}
	});

	it('mixed addApplications and addPoint calls produce correct total feature count', () => {
		for (let i = 0; i < NUM_ITERATIONS; i++) {
			const appCount = Math.floor(Math.random() * 10);
			const pointCount = Math.floor(Math.random() * 10);
			const applications = Array.from({ length: appCount }, randomApplication);
			const coordinates = Array.from({ length: pointCount }, () => [randomLng(), randomLat()]);

			const builder = new GeoJSONBuilder();
			builder.addApplications(applications);
			for (const coord of coordinates) {
				builder.addPoint(coord);
			}
			const result = builder.build();

			expect(result.type).toBe('FeatureCollection');
			expect(result.features).toHaveLength(appCount + pointCount);
		}
	});
});
