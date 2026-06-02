'use strict';

const { GeoJSONBuilder } = require('../geojson-builder');
const { randomLng, randomLat, randomString, shuffle, isValidCoordinate } = require('./test-utils');

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

// GeoJSON Builder round-trip - build() output matches input coordinates
describe('GeoJSON Builder - Round-trip', () => {
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

// GeoJSON Builder excludes invalid coordinates from output
describe('GeoJSON Builder - excludes invalid coordinates', () => {
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
