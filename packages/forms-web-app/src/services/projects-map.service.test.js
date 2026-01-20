const { transformProjectsToGeoJSON } = require('./projects-map.service');

describe('services/projects-map.service', () => {
	it('should transform projects to valid GeoJSON', () => {
		const applications = [
			{
				CaseReference: 'EN010001',
				ProjectName: 'Test Project',
				LongLat: [-1.5, 51.5],
				Stage: 'pre-application',
				Summary: 'Test summary',
				Region: 'London'
			}
		];

		const result = transformProjectsToGeoJSON(applications);

		expect(result.type).toBe('FeatureCollection');
		expect(result.features).toHaveLength(1);
		expect(result.features[0]).toEqual({
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-1.5, 51.5]
			},
			properties: {
				caseRef: 'EN010001',
				projectName: 'Test Project',
				stage: expect.any(String),
				summary: 'Test summary',
				region: 'London'
			}
		});
	});

	it('should filter out invalid coordinates', () => {
		const applications = [
			{ CaseReference: 'EN010001', LongLat: [-1.5, 51.5] }, // Valid
			{ CaseReference: 'EN010002' }, // Missing LongLat
			{ CaseReference: 'EN010003', LongLat: [-1.5] }, // Incomplete
			{ CaseReference: 'EN010004', LongLat: ['abc', 'def'] }, // Non-numeric
			{ CaseReference: 'EN010005', LongLat: [-200, 51.5] }, // Out of bounds
			{ CaseReference: 'EN010006', LongLat: [-1.5, 95] } // Out of bounds
		];

		const result = transformProjectsToGeoJSON(applications);

		expect(result.features).toHaveLength(1);
		expect(result.features[0].properties.caseRef).toBe('EN010001');
	});

	it('should handle edge cases', () => {
		expect(transformProjectsToGeoJSON([])).toEqual({ type: 'FeatureCollection', features: [] });
		expect(transformProjectsToGeoJSON(null)).toEqual({ type: 'FeatureCollection', features: [] });
		expect(transformProjectsToGeoJSON(undefined)).toEqual({
			type: 'FeatureCollection',
			features: []
		});
	});
});
