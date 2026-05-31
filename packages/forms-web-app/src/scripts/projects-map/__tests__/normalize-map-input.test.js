import { normalizeMapInput } from '../normalize-map-input';

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

describe('scripts/projects-map/normalize-map-input', () => {
	describe('single [lng, lat] array', () => {
		it('should return singlePoint mode for a coordinate pair', () => {
			const result = normalizeMapInput([-0.118, 51.509]);

			expect(result.mode).toBe('singlePoint');
			expect(result.features).toHaveLength(1);
		});
	});

	describe('FeatureCollection with multiple Points', () => {
		it('should return multiPoint mode', () => {
			const input = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: { type: 'Point', coordinates: [-0.118, 51.509] },
						properties: { caseReference: 'EN010001' }
					},
					{
						type: 'Feature',
						geometry: { type: 'Point', coordinates: [-1.5, 52.0] },
						properties: { caseReference: 'EN010002' }
					}
				]
			};

			const result = normalizeMapInput(input);

			expect(result.mode).toBe('multiPoint');
			expect(result.features).toHaveLength(2);
		});
	});

	describe('FeatureCollection with Polygon geometries', () => {
		it('should return geojson mode', () => {
			const input = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: {
							type: 'Polygon',
							coordinates: [
								[
									[-0.1, 51.5],
									[-0.1, 51.6],
									[-0.2, 51.6],
									[-0.2, 51.5],
									[-0.1, 51.5]
								]
							]
						},
						properties: {}
					}
				]
			};

			const result = normalizeMapInput(input);

			expect(result.mode).toBe('geojson');
			expect(result.features).toHaveLength(1);
		});

		it('should return geojson mode for MultiPolygon geometries', () => {
			const input = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: {
							type: 'MultiPolygon',
							coordinates: [
								[
									[
										[-0.1, 51.5],
										[-0.1, 51.6],
										[-0.2, 51.6],
										[-0.2, 51.5],
										[-0.1, 51.5]
									]
								]
							]
						},
						properties: {}
					}
				]
			};

			const result = normalizeMapInput(input);

			expect(result.mode).toBe('geojson');
			expect(result.features).toHaveLength(1);
		});
	});

	describe('FeatureCollection with single Point', () => {
		it('should return singlePoint mode', () => {
			const input = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: { type: 'Point', coordinates: [-0.118, 51.509] },
						properties: { caseReference: 'EN010001' }
					}
				]
			};

			const result = normalizeMapInput(input);

			expect(result.mode).toBe('singlePoint');
			expect(result.features).toHaveLength(1);
		});
	});

	describe('null/undefined input', () => {
		it('should return empty features with multiPoint mode for null', () => {
			const result = normalizeMapInput(null);

			expect(result.mode).toBe('multiPoint');
			expect(result.features).toHaveLength(0);
		});

		it('should return empty features with multiPoint mode for undefined', () => {
			const result = normalizeMapInput(undefined);

			expect(result.mode).toBe('multiPoint');
			expect(result.features).toHaveLength(0);
		});
	});
});
