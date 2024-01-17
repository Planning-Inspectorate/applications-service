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

		it('excludes undefined values from filter counts', () => {
			const result = buildApiFiltersFromNIApplications([
				{ Stage: 1, Region: 'South East', Proposal: 'BC08 - Leisure' },
				{ Stage: null, Region: 'North East', Proposal: 'EN01 - Generating Stations' },
				{ Stage: 2, Region: null, Proposal: 'BC08 - Leisure' },
				{ Stage: 2, Region: 'South East', Proposal: null }
			]);

			expect(result).toEqual([
				{ name: 'stage', label: 'Pre-application', value: 'pre_application', count: 1 },
				{ name: 'stage', label: 'Acceptance', value: 'acceptance', count: 2 },
				{ name: 'region', label: 'South East', value: 'south_east', count: 2 },
				{ name: 'region', label: 'North East', value: 'north_east', count: 1 },
				{
					name: 'sector',
					label: 'Business and Commercial',
					value: 'business_and_commercial',
					count: 2
				},
				{ name: 'sector', label: 'Energy', value: 'energy', count: 1 }
			]);
		});

		it('excludes invalid values from filter counts', () => {
			const result = buildApiFiltersFromNIApplications([
				{ Stage: 1, Region: 'NOT A REGION', Proposal: 'BC08 - Leisure' },
				{ Stage: null, Region: 'North East', Proposal: 'NOT A PROPOSAL' },
				{ Stage: 200, Region: null, Proposal: 'BC08 - Leisure' }
			]);

			expect(result).toEqual([
				{ name: 'stage', label: 'Pre-application', value: 'pre_application', count: 1 },
				{ name: 'region', label: 'North East', value: 'north_east', count: 1 },
				{
					name: 'sector',
					label: 'Business and Commercial',
					value: 'business_and_commercial',
					count: 2
				}
			]);
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
		describe('when applicant does not exist', () => {
			it('maps back office application data to api format', () => {
				const applicationWithoutApplicant = {
					...APPLICATION_DB,
					applicant: null
				};
				expect(mapBackOfficeApplicationToApi(applicationWithoutApplicant)).toEqual(
					expect.objectContaining({
						...APPLICATION_API,
						applicantEmailAddress: '',
						applicantFirstName: '',
						applicantLastName: '',
						applicantName: '',
						applicantPhoneNumber: '',
						applicantWebsite: '',
						sourceSystem: 'ODT'
					})
				);
			});
		});
		describe('when applicant exists', () => {
			it('maps back office application data to api format', () => {
				const applicationWithApplicant = {
					...APPLICATION_DB,
					applicant: {
						organisationName: 'Test Organisation',
						firstName: 'Test',
						lastName: 'User',
						phoneNumber: '0123456789',
						email: 'test@test.com',
						webAddress: 'www.test.com'
					}
				};
				expect(mapBackOfficeApplicationToApi(applicationWithApplicant)).toEqual(
					expect.objectContaining({
						...APPLICATION_API,
						applicantEmailAddress: applicationWithApplicant.applicant.email,
						applicantFirstName: applicationWithApplicant.applicant.firstName,
						applicantLastName: applicationWithApplicant.applicant.lastName,
						applicantName: applicationWithApplicant.applicant.organisationName,
						applicantPhoneNumber: applicationWithApplicant.applicant.phoneNumber,
						applicantWebsite: applicationWithApplicant.applicant.webAddress,
						sourceSystem: 'ODT'
					})
				);
			});
		});

		it('returns undefined if no application provided', () => {
			expect(mapBackOfficeApplicationToApi(undefined)).toEqual(undefined);
		});
	});

	describe('addMapZoomLevelAndLongLat', () => {
		it.each([
			[
				{ LatLong: '53.620, -0.702', MapZoomLevel: 'Region' },
				{ LongLat: ['-0.702', '53.620'], MapZoomLevel: 1 }
			],
			[
				{ LatLong: '   53.620   , -0.702   ', MapZoomLevel: 'Region' },
				{ LongLat: ['-0.702', '53.620'], MapZoomLevel: 1 }
			],
			[{ LatLong: '53.620, -0.702' }, { LongLat: ['-0.702', '53.620'], MapZoomLevel: 0 }],
			[{ MapZoomLevel: 'Region' }, { LongLat: [], MapZoomLevel: 1 }]
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
