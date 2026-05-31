import { normalizeMapInput } from '../normalize-map-input';

/**
 * Property test for normalize-map-input classification
 * **Validates: Requirements 1.7, 3.5**
 *
 * Property 1: Render mode classification is deterministic and correct
 */

jest.mock('ol/format/GeoJSON.js', () => {
	return jest.fn().mockImplementation(() => ({
		readFeatures: jest.fn((geojson) => {
			if (!geojson || !geojson.features) return [];
			return geojson.features.map((f, i) => ({
				_mockFeature: true,
				_index: i,
				getGeometry: () => ({
					getType: () => f.geometry.type,
					getCoordinates: () => f.geometry.coordinates
				})
			}));
		})
	}));
});

jest.mock('ol/Feature.js', () => {
	return jest.fn().mockImplementation((geom) => ({
		_mockFeature: true,
		_geometry: geom
	}));
});

jest.mock('ol/geom/Point.js', () => {
	return jest.fn().mockImplementation((coords) => ({
		_mockPoint: true,
		_coordinates: coords
	}));
});

jest.mock('ol/proj.js', () => ({
	transform: jest.fn((coord) => [coord[0] * 1000, coord[1] * 1000])
}));

// --- Helpers for generating random test data ---

const NUM_ITERATIONS = 100;

function randomLng() {
	return Math.random() * 360 - 180;
}

function randomLat() {
	return Math.random() * 180 - 90;
}

function randomPointFeature() {
	return {
		type: 'Feature',
		geometry: { type: 'Point', coordinates: [randomLng(), randomLat()] },
		properties: {}
	};
}

function randomPolygonFeature() {
	const lng = randomLng();
	const lat = randomLat();
	const dLng = Math.random() * 0.5 + 0.01;
	const dLat = Math.random() * 0.5 + 0.01;
	return {
		type: 'Feature',
		geometry: {
			type: Math.random() > 0.5 ? 'Polygon' : 'MultiPolygon',
			coordinates:
				Math.random() > 0.5
					? [
							[
								[lng, lat],
								[lng + dLng, lat],
								[lng + dLng, lat + dLat],
								[lng, lat + dLat],
								[lng, lat]
							]
					  ]
					: [
							[
								[
									[lng, lat],
									[lng + dLng, lat],
									[lng + dLng, lat + dLat],
									[lng, lat + dLat],
									[lng, lat]
								]
							]
					  ]
		},
		properties: {}
	};
}

describe('scripts/projects-map/normalize-map-input - Property Tests', () => {
	describe('Property 1: Render mode classification is deterministic and correct', () => {
		it('null/undefined input always returns multiPoint mode with empty features', () => {
			for (const input of [null, undefined]) {
				const result = normalizeMapInput(input);
				expect(result.mode).toBe('multiPoint');
				expect(result.features).toHaveLength(0);
			}
		});

		it('[lng, lat] array always returns singlePoint mode with exactly 1 feature', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const input = [randomLng(), randomLat()];
				const result = normalizeMapInput(input);
				expect(result.mode).toBe('singlePoint');
				expect(result.features).toHaveLength(1);
			}
		});

		it('FeatureCollection with Polygon/MultiPolygon always returns geojson mode', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const numPolygons = Math.floor(Math.random() * 5) + 1;
				const numPoints = Math.floor(Math.random() * 3);
				const features = [
					...Array.from({ length: numPolygons }, randomPolygonFeature),
					...Array.from({ length: numPoints }, randomPointFeature)
				];
				const input = { type: 'FeatureCollection', features };

				const result = normalizeMapInput(input);
				expect(result.mode).toBe('geojson');
				expect(result.features.length).toBeGreaterThan(0);
			}
		});

		it('FeatureCollection with exactly 1 Point always returns singlePoint mode', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const input = { type: 'FeatureCollection', features: [randomPointFeature()] };
				const result = normalizeMapInput(input);
				expect(result.mode).toBe('singlePoint');
				expect(result.features).toHaveLength(1);
			}
		});

		it('FeatureCollection with multiple Points always returns multiPoint mode', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const numPoints = Math.floor(Math.random() * 18) + 2;
				const features = Array.from({ length: numPoints }, randomPointFeature);
				const input = { type: 'FeatureCollection', features };

				const result = normalizeMapInput(input);
				expect(result.mode).toBe('multiPoint');
				expect(result.features.length).toBeGreaterThanOrEqual(2);
			}
		});

		it('classification is deterministic - same input always produces same mode', () => {
			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const input = [randomLng(), randomLat()];
				const result1 = normalizeMapInput(input);
				const result2 = normalizeMapInput(input);
				expect(result1.mode).toBe(result2.mode);
				expect(result1.features.length).toBe(result2.features.length);
			}
		});
	});
});
