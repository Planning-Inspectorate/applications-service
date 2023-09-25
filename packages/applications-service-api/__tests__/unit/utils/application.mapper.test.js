const {
	buildApiFiltersFromNIApplications,
	mapApplicationFiltersToNI,
	mapNIApplicationToApi,
	mapBackOfficeApplicationToApi,
	addMapZoomLevelAndLongLat
} = require('../../../src/utils/application.mapper');
const {
	APPLICATIONS_NI_FILTER_COLUMNS,
	APPLICATIONS_FO_FILTERS,
	APPLICATION_FO,
	APPLICATION_API,
	APPLICATION_DB
} = require('../../__data__/application');

describe('application.mapper', () => {
	describe('buildApiFiltersFromNIApplications', () => {
		it('maps applications from NI database to filters in api format', () => {
			const result = buildApiFiltersFromNIApplications(APPLICATIONS_NI_FILTER_COLUMNS);

			expect(result).toEqual(APPLICATIONS_FO_FILTERS);
		});
	});

	describe('mapApplicationFiltersToNI', () => {
		it('maps api filters to NI database values', () => {
			const apiRequestFilters = {
				stage: ['acceptance', 'pre_examination'],
				sector: ['energy', 'transport'],
				region: ['south_east', 'north_west']
			};

			const result = mapApplicationFiltersToNI(apiRequestFilters);

			expect(result).toEqual({
				stage: [2, 3],
				sector: ['EN', 'TR'],
				region: ['South East', 'North West']
			});
		});
	});

	describe('mapNIApplicationToApi', () => {
		it('maps ni db application data to api format', () => {
			expect(mapNIApplicationToApi(APPLICATION_FO)).toEqual(
				expect.objectContaining({
					...APPLICATION_API,
					dateOfDCOAcceptance: null,
					deadlineForAcceptanceDecision: null,
					sourceSystem: 'HORIZON'
				})
			);
		});

		it('does not map zoom level and longlat if already mapped', () => {
			const applicationAlreadyMappedLocationAttributes = {
				...APPLICATION_FO,
				LongLat: ['-0.7123', '53.6123'],
				MapZoomLevel: 6
			};
			delete applicationAlreadyMappedLocationAttributes.LatLong;

			expect(mapNIApplicationToApi(applicationAlreadyMappedLocationAttributes)).toEqual(
				expect.objectContaining({
					...APPLICATION_API,
					longLat: ['-0.7123', '53.6123'],
					mapZoomLevel: 6,
					dateOfDCOAcceptance: null,
					deadlineForAcceptanceDecision: null,
					sourceSystem: 'HORIZON'
				})
			);
		});

		it('returns undefined if no application provided', () => {
			expect(mapNIApplicationToApi(undefined)).toEqual(undefined);
		});
	});

	describe('mapBackOfficeApplicationToApi', () => {
		it('maps back office application data to api format', () => {
			expect(mapBackOfficeApplicationToApi(APPLICATION_DB)).toEqual(
				expect.objectContaining({
					...APPLICATION_API,
					applicantName: 'TBC',
					applicantFirstName: 'TBC',
					applicantLastName: 'TBC',
					applicantEmailAddress: 'TBC',
					applicantPhoneNumber: 'TBC',
					applicantWebsite: 'TBC',
					sourceSystem: 'ODT'
				})
			);
		});

		it('returns undefined if no application provided', () => {
			expect(mapBackOfficeApplicationToApi(undefined)).toEqual(undefined);
		});
	});

	describe('addMapZoomLevelAndLongLat', () => {
		it.each([
			[
				{ LatLong: '53.620, -0.702', MapZoomLevel: 'Region' },
				{ LongLat: ['-0.702', '53.620'], MapZoomLevel: 6 }
			],
			[
				{ LatLong: '   53.620   , -0.702   ', MapZoomLevel: 'Region' },
				{ LongLat: ['-0.702', '53.620'], MapZoomLevel: 6 }
			],
			[{ LatLong: '53.620, -0.702' }, { LongLat: ['-0.702', '53.620'], MapZoomLevel: 5 }],
			[{ MapZoomLevel: 'Region' }, { LongLat: [], MapZoomLevel: 6 }]
		])('adds LongLat and MapZoomLevel to NI application', (input, output) => {
			const inputApplication = {
				...APPLICATION_FO,
				LatLong: input.LatLong,
				MapZoomLevel: input.MapZoomLevel
			};

			const outputApplication = {
				...APPLICATION_FO,
				LongLat: output.LongLat,
				MapZoomLevel: output.MapZoomLevel
			};
			delete outputApplication.LatLong;

			expect(addMapZoomLevelAndLongLat(inputApplication)).toEqual(outputApplication);
		});
	});
});
