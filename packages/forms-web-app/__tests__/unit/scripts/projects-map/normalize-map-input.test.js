/**
 * @fileoverview Unit tests for {@link module:scripts/projects-map/normalize-map-input}.
 */
'use strict';

jest.mock('ol/format/GeoJSON.js', () => ({ __esModule: true, default: jest.fn() }));

const { normalizeMapInput } = require('../../../../src/scripts/projects-map/normalize-map-input');
const MockGeoJSON = require('ol/format/GeoJSON.js').default;

const normalize = (mapInput) => normalizeMapInput(mapInput);

let mockReadFeatures;

beforeEach(() => {
	mockReadFeatures = jest.fn((geojson) =>
		(geojson.features || []).map((f) => ({ ...f, _read: true }))
	);
	MockGeoJSON.mockImplementation(function () {
		this.readFeatures = mockReadFeatures;
	});
});

describe('normalizeMapInput', () => {
	describe('null / undefined input', () => {
		it('returns singlePoint mode with empty features and a warning for null', () => {
			const result = normalize(null);
			expect(result.mode).toBe('singlePoint');
			expect(result.features).toHaveLength(0);
			expect(result.warnings).toHaveLength(1);
			expect(result.warnings[0]).toMatch(/null\/undefined/);
		});

		it('returns singlePoint mode with empty features and a warning for undefined', () => {
			const result = normalize(undefined);
			expect(result.mode).toBe('singlePoint');
			expect(result.features).toHaveLength(0);
			expect(result.warnings).toHaveLength(1);
		});
	});

	describe('GeoJSON FeatureCollection', () => {
		const geojson = {
			type: 'FeatureCollection',
			features: [
				{ type: 'Feature', geometry: { type: 'Point', coordinates: [-0.1, 51.5] }, properties: {} },
				{ type: 'Feature', geometry: { type: 'Point', coordinates: [-0.2, 51.6] }, properties: {} }
			]
		};

		it('returns multiPoint mode for a Point FeatureCollection', () => {
			expect(normalize(geojson).mode).toBe('multiPoint');
		});

		it('returns geojson mode for a non-Point FeatureCollection', () => {
			const polygon = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: {
							type: 'Polygon',
							coordinates: [
								[
									[0, 0],
									[1, 0],
									[1, 1],
									[0, 0]
								]
							]
						},
						properties: {}
					}
				]
			};
			expect(normalize(polygon).mode).toBe('geojson');
		});

		it('passes input through GeoJSON readFeatures with correct projections', () => {
			normalizeMapInput(geojson);
			expect(mockReadFeatures).toHaveBeenCalledWith(
				expect.objectContaining({ type: 'FeatureCollection', features: geojson.features }),
				{ dataProjection: 'EPSG:4326', featureProjection: 'EPSG:27700' }
			);
		});

		it('returns features from readFeatures', () => {
			const result = normalize(geojson);
			expect(result.features).toHaveLength(2);
		});

		it('returns no warnings', () => {
			expect(normalize(geojson).warnings).toHaveLength(0);
		});
	});

	describe('GeoJSON FeatureCollection with invalid features', () => {
		const validFeature = {
			type: 'Feature',
			geometry: { type: 'Point', coordinates: [-0.1, 51.5] },
			properties: {}
		};

		it('filters out features without type and adds a warning', () => {
			const mixed = {
				type: 'FeatureCollection',
				features: [validFeature, { geometry: { type: 'Point', coordinates: [0, 0] } }, null]
			};
			const result = normalize(mixed);
			expect(mockReadFeatures).toHaveBeenCalledWith(
				expect.objectContaining({ features: [validFeature] }),
				expect.any(Object)
			);
			expect(result.warnings).toHaveLength(1);
			expect(result.warnings[0]).toMatch(/dropped 2/);
		});

		it('handles missing features array gracefully', () => {
			const noFeatures = { type: 'FeatureCollection' };
			const result = normalize(noFeatures);
			expect(mockReadFeatures).toHaveBeenCalledWith(
				expect.objectContaining({ features: [] }),
				expect.any(Object)
			);
			expect(result.warnings).toHaveLength(0);
		});
	});

	describe('single [lng, lat] point', () => {
		it('returns singlePoint mode', () => {
			expect(normalize([-0.118092, 51.509865]).mode).toBe('singlePoint');
		});

		it('returns exactly one feature', () => {
			expect(normalize([-0.118092, 51.509865]).features).toHaveLength(1);
		});

		it('passes coordinates through readFeatures with correct projections', () => {
			normalizeMapInput([-0.118092, 51.509865]);
			expect(mockReadFeatures).toHaveBeenCalledWith(
				expect.objectContaining({
					type: 'FeatureCollection',
					features: [
						expect.objectContaining({
							geometry: { type: 'Point', coordinates: [-0.118092, 51.509865] }
						})
					]
				}),
				{ dataProjection: 'EPSG:4326', featureProjection: 'EPSG:27700' }
			);
		});

		it('accepts numeric strings produced by Nunjucks array interpolation', () => {
			const result = normalize(['-0.118092', '51.509865']);
			expect(result.mode).toBe('singlePoint');
			expect(result.features).toHaveLength(1);
		});

		it('returns no warnings', () => {
			expect(normalize([-0.118092, 51.509865]).warnings).toHaveLength(0);
		});
	});

	describe('array of multiple [lng, lat] points', () => {
		const multiPoints = [
			[-0.1, 51.5],
			[-0.2, 51.6],
			[-0.3, 51.7]
		];

		it('returns multiPoint mode for 3 points', () => {
			expect(normalize(multiPoints).mode).toBe('multiPoint');
		});

		it('returns the correct number of features', () => {
			expect(normalize(multiPoints).features).toHaveLength(3);
		});

		it('returns singlePoint mode when only one valid point in array', () => {
			const result = normalize([[-0.1, 51.5]]);
			expect(result.mode).toBe('singlePoint');
			expect(result.features).toHaveLength(1);
		});

		it('skips invalid points and adds a warning per bad entry', () => {
			const mixed = [[-0.1, 51.5], null, [-0.2, 'not-a-number'], [-0.3, 51.7]];
			const result = normalize(mixed);
			expect(result.features).toHaveLength(2);
			expect(result.warnings).toHaveLength(2);
			result.warnings.forEach((w) => expect(w).toMatch(/skipping invalid point/));
		});

		it('returns empty features and multiPoint mode when all points are invalid', () => {
			const result = normalize([null, undefined, 'bad']);
			expect(result.features).toHaveLength(0);
			// array of 3 non-coordinate items — stays multiPoint (no valid single point found)
			expect(result.mode).toBe('multiPoint');
		});
	});

	describe('unrecognised input types', () => {
		it.each([
			['string', 'some-string'],
			['number', 42],
			['plain object without type', { lat: 51, lng: -0.1 }]
		])('returns singlePoint mode and a warning for %s', (_label, input) => {
			const result = normalize(input);
			expect(result.mode).toBe('singlePoint');
			expect(result.features).toHaveLength(0);
			expect(result.warnings).toHaveLength(1);
			expect(result.warnings[0]).toMatch(/unrecognised input/);
		});
	});
});
