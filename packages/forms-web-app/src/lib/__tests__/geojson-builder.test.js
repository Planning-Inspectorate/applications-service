'use strict';

const { GeoJSONBuilder } = require('../geojson-builder');

function isValidCoordinate(coordinate) {
	if (!Array.isArray(coordinate) || coordinate.length < 2) return false;
	const lng = parseFloat(coordinate[0]);
	const lat = parseFloat(coordinate[1]);
	return !isNaN(lng) && !isNaN(lat);
}

const validApplicationFixtures = [
	{
		LongLat: [-0.1, 51.5],
		CaseReference: 'EN010100',
		ProjectName: 'Valid Project A',
		Stage: 2
	},
	{
		LongLat: [0.35, 52.2],
		CaseReference: 'EN010101',
		ProjectName: 'Valid Project B',
		Stage: 4
	},
	{
		LongLat: ['1.25', '53.8'],
		CaseReference: 'EN010102',
		ProjectName: 'Valid Project C',
		Stage: 6
	}
];

const invalidCoordinateFixtures = [
	null,
	undefined,
	[],
	[1.0],
	['abc', 'def'],
	[NaN, 51.5],
	[-0.1, NaN],
	'not-an-array',
	42
];

const invalidApplicationFixtures = invalidCoordinateFixtures.map((coordinate, index) => ({
	LongLat: coordinate,
	CaseReference: `EN0199${index}`,
	ProjectName: `Invalid Project ${index}`,
	Stage: 1
}));

describe('GeoJSONBuilder', () => {
	describe('addApplications', () => {
		it('produces a correct FeatureCollection from valid records', () => {
			const apps = [
				{
					CaseReference: 'EN010001',
					ProjectName: 'Wind Farm Alpha',
					Stage: 4,
					LongLat: [-1.5, 52.0]
				},
				{
					CaseReference: 'EN010002',
					ProjectName: 'Solar Park Beta',
					Stage: 6,
					LongLat: [0.12, 51.5]
				}
			];

			const result = new GeoJSONBuilder().addApplications(apps).build();

			expect(result.type).toBe('FeatureCollection');
			expect(result.features).toHaveLength(2);
			expect(result.features[0]).toEqual({
				type: 'Feature',
				geometry: { type: 'Point', coordinates: [-1.5, 52.0] },
				properties: {
					caseReference: 'EN010001',
					projectName: 'Wind Farm Alpha',
					stage: 'Examination',
					projectURL: '/projects/EN010001'
				}
			});
			expect(result.features[1]).toEqual({
				type: 'Feature',
				geometry: { type: 'Point', coordinates: [0.12, 51.5] },
				properties: {
					caseReference: 'EN010002',
					projectName: 'Solar Park Beta',
					stage: 'Decision',
					projectURL: '/projects/EN010002'
				}
			});
		});

		it.each([
			[0, 'Draft'],
			[1, 'Pre-application'],
			[2, 'Acceptance'],
			[3, 'Pre-examination'],
			[4, 'Examination'],
			[5, 'Recommendation'],
			[6, 'Decision'],
			[7, 'Post-decision'],
			[8, 'Withdrawn']
		])('maps stage %s to %s', (stageNumber, expectedLabel) => {
			const result = new GeoJSONBuilder()
				.addApplications([
					{ CaseReference: 'REF', ProjectName: 'P', Stage: stageNumber, LongLat: [0, 0] }
				])
				.build();

			expect(result.features[0].properties.stage).toBe(expectedLabel);
		});

		it('passes through unknown stage values as-is', () => {
			const result = new GeoJSONBuilder()
				.addApplications([
					{ CaseReference: 'REF', ProjectName: 'P', Stage: 'Custom', LongLat: [0, 0] }
				])
				.build();

			expect(result.features[0].properties.stage).toBe('Custom');
		});

		it('includes only records with valid LongLat values', () => {
			const mixedApplications = [
				...invalidApplicationFixtures.slice(0, 4),
				...validApplicationFixtures,
				...invalidApplicationFixtures.slice(4)
			];

			const result = new GeoJSONBuilder().addApplications(mixedApplications).build();
			const expectedValidRecords = mixedApplications.filter((application) =>
				isValidCoordinate(application.LongLat)
			);

			expect(result.features).toHaveLength(expectedValidRecords.length);
			result.features.forEach((feature, index) => {
				const expected = expectedValidRecords[index];
				expect(feature.properties.caseReference).toBe(expected.CaseReference);
				expect(feature.geometry.coordinates).toEqual([
					parseFloat(expected.LongLat[0]),
					parseFloat(expected.LongLat[1])
				]);
			});
		});
	});

	describe('addPoint', () => {
		it('adds a single feature with given coordinate and properties', () => {
			const result = new GeoJSONBuilder().addPoint([-2.5, 53.4], { name: 'Test Point' }).build();

			expect(result.features).toHaveLength(1);
			expect(result.features[0]).toEqual({
				type: 'Feature',
				geometry: { type: 'Point', coordinates: [-2.5, 53.4] },
				properties: { name: 'Test Point' }
			});
		});

		it('uses empty properties object by default', () => {
			const result = new GeoJSONBuilder().addPoint([0, 0]).build();
			expect(result.features[0].properties).toEqual({});
		});

		it('parses string coordinates to numbers', () => {
			const result = new GeoJSONBuilder().addPoint(['1.5', '51.2']).build();
			expect(result.features[0].geometry.coordinates).toEqual([1.5, 51.2]);
		});

		it.each(invalidCoordinateFixtures)('silently skips invalid coordinate: %p', (coordinate) => {
			const result = new GeoJSONBuilder().addPoint(coordinate).build();
			expect(result.features).toHaveLength(0);
		});
	});

	describe('build', () => {
		it('returns an empty FeatureCollection when no features added', () => {
			expect(new GeoJSONBuilder().build()).toEqual({
				type: 'FeatureCollection',
				features: []
			});
		});
	});

	describe('chaining', () => {
		it('supports addApplications().addPoint().build() chaining', () => {
			const apps = [
				{ CaseReference: 'EN010001', ProjectName: 'Project A', Stage: 1, LongLat: [-1.0, 51.0] }
			];

			const result = new GeoJSONBuilder()
				.addApplications(apps)
				.addPoint([0.5, 52.0], { label: 'Extra Point' })
				.build();

			expect(result.type).toBe('FeatureCollection');
			expect(result.features).toHaveLength(2);
			expect(result.features[0].properties.caseReference).toBe('EN010001');
			expect(result.features[0].geometry.coordinates).toEqual([-1.0, 51.0]);
			expect(result.features[1].properties.label).toBe('Extra Point');
			expect(result.features[1].geometry.coordinates).toEqual([0.5, 52.0]);
		});

		it('addApplications returns the builder instance', () => {
			const builder = new GeoJSONBuilder();
			expect(builder.addApplications([])).toBe(builder);
		});

		it('addPoint returns the builder instance', () => {
			const builder = new GeoJSONBuilder();
			expect(builder.addPoint([0, 0])).toBe(builder);
		});
	});
});
