const {
	buildApiFiltersFromNIApplications,
	mapApplicationFiltersToNI,
	mapNIApplicationToApi,
	mapBackOfficeApplicationToApi
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
	});
});
