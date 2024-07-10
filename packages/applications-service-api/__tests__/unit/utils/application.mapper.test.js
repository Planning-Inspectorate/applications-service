const { omit } = require('lodash');
const {
	buildApplicationsFiltersFromApplications,
	mapApplicationToApi,
	mapApplicationsToApi,
	addMapZoomLevelAndLongLat
} = require('../../../src/utils/application.mapper');
const {
	APPLICATIONS_BO_FILTER_COLUMNS,
	APPLICATIONS_FO_FILTERS,
	APPLICATION_FO,
	APPLICATION_API,
	APPLICATION_API_V1,
	APPLICATION_DB
} = require('../../__data__/application');
const config = require('../../../src/lib/config');

describe('application.mapper', () => {
	describe('buildApplicationsFiltersFromApplications', () => {
		it('maps applications from back office database to filters in api format (FEATURE_ALLOW_WELSH_TRANSLATION=true)', () => {
			config.featureFlag.allowWelshTranslation = true;
			const result = buildApplicationsFiltersFromApplications(APPLICATIONS_BO_FILTER_COLUMNS);
			expect(result).toEqual(APPLICATIONS_FO_FILTERS);
		});
		it('maps applications from back office database to filters in api format (FEATURE_ALLOW_WELSH_TRANSLATION=false)', () => {
			config.featureFlag.allowWelshTranslation = false;
			const result = buildApplicationsFiltersFromApplications(APPLICATIONS_BO_FILTER_COLUMNS);

			const filters = APPLICATIONS_FO_FILTERS.map((filter) => omit(filter, ['label_cy']));
			expect(result).toEqual(filters);
		});
		it('excludes undefined values from filter counts (FEATURE_ALLOW_WELSH_TRANSLATION=true)', () => {
			config.featureFlag.allowWelshTranslation = true;

			const result = buildApplicationsFiltersFromApplications([
				{ stage: 'acceptance', regions: 'south_east', sector: 'EN01 - Generating Stations' },
				{ stage: null, regions: 'north_east', sector: 'EN01 - Generating Stations' },
				{ stage: 'pre_application', regions: null, sector: 'BC08 - Leisure' },
				{ stage: 'pre_application', regions: 'south_east', sector: null }
			]);
			expect(result).toEqual([
				{
					name: 'stage',
					label: 'Pre-application',
					label_cy: 'Cyn-ymgeisio',
					value: 'pre_application',
					count: 2
				},
				{ name: 'stage', label: 'Acceptance', label_cy: 'Derbyn', value: 'acceptance', count: 1 },
				{
					name: 'region',
					label: 'South East',
					label_cy: 'Y De-ddwyrain',
					value: 'south_east',
					count: 2
				},
				{
					name: 'region',
					label: 'North East',
					label_cy: 'Y Gogledd-ddwyrain',
					value: 'north_east',
					count: 1
				},
				{ name: 'sector', label: 'Energy', label_cy: 'Ynni', value: 'energy', count: 2 },
				{
					name: 'sector',
					label: 'Business and Commercial',
					label_cy: 'Busnes a Masnachol',
					value: 'business_and_commercial',
					count: 1
				}
			]);
		});
		it('excludes undefined values from filter counts (FEATURE_ALLOW_WELSH_TRANSLATION=false)', () => {
			config.featureFlag.allowWelshTranslation = false;

			const result = buildApplicationsFiltersFromApplications([
				{ stage: 'acceptance', regions: 'south_east', sector: 'EN01 - Generating Stations' },
				{ stage: null, regions: 'north_east', sector: 'EN01 - Generating Stations' },
				{ stage: 'pre_application', regions: null, sector: 'BC08 - Leisure' },
				{ stage: 'pre_application', regions: 'south_east', sector: null }
			]);
			expect(result).toEqual([
				{
					name: 'stage',
					label: 'Pre-application',
					value: 'pre_application',
					count: 2
				},
				{ name: 'stage', label: 'Acceptance', value: 'acceptance', count: 1 },
				{
					name: 'region',
					label: 'South East',
					value: 'south_east',
					count: 2
				},
				{
					name: 'region',
					label: 'North East',
					value: 'north_east',
					count: 1
				},
				{ name: 'sector', label: 'Energy', value: 'energy', count: 2 },
				{
					name: 'sector',
					label: 'Business and Commercial',
					value: 'business_and_commercial',
					count: 1
				}
			]);
		});
		it('handles multiple regions in one application correctly (FEATURE_ALLOW_WELSH_TRANSLATION=true)', () => {
			config.featureFlag.allowWelshTranslation = true;

			const result = buildApplicationsFiltersFromApplications([
				{
					stage: 'acceptance',
					regions: 'south_east,north_west',
					sector: 'EN01 - Generating Stations'
				},
				{ stage: 'pre_application', regions: 'south_east', sector: 'BC08 - Leisure' },
				{
					stage: 'pre_application',
					regions: 'north_east,north_east,wales',
					sector: 'BC08 - Leisure'
				},
				{ stage: 'acceptance', regions: 'south_west', sector: 'EN01 - Generating Stations' }
			]);
			expect(result).toEqual([
				{
					name: 'stage',
					label: 'Pre-application',
					label_cy: 'Cyn-ymgeisio',
					value: 'pre_application',
					count: 2
				},
				{ name: 'stage', label: 'Acceptance', label_cy: 'Derbyn', value: 'acceptance', count: 2 },
				{
					name: 'region',
					label: 'South East',
					label_cy: 'Y De-ddwyrain',
					value: 'south_east',
					count: 2
				},
				{
					name: 'region',
					label: 'North West',
					label_cy: 'Y Gogledd-orllewin',
					value: 'north_west',
					count: 1
				},
				{
					name: 'region',
					label: 'North East',
					label_cy: 'Y Gogledd-ddwyrain',
					value: 'north_east',
					count: 2
				},
				{ name: 'region', label: 'Wales', label_cy: 'Cymru', value: 'wales', count: 1 },
				{
					name: 'region',
					label: 'South West',
					label_cy: 'Y De-orllewin',
					value: 'south_west',
					count: 1
				},
				{ name: 'sector', label: 'Energy', label_cy: 'Ynni', value: 'energy', count: 2 },
				{
					name: 'sector',
					label: 'Business and Commercial',
					label_cy: 'Busnes a Masnachol',
					value: 'business_and_commercial',
					count: 2
				}
			]);
		});
		it('handles multiple regions in one application correctly (FEATURE_ALLOW_WELSH_TRANSLATION=false)', () => {
			config.featureFlag.allowWelshTranslation = false;

			const result = buildApplicationsFiltersFromApplications([
				{
					stage: 'acceptance',
					regions: 'south_east,north_west',
					sector: 'EN01 - Generating Stations'
				},
				{ stage: 'pre_application', regions: 'south_east', sector: 'BC08 - Leisure' },
				{
					stage: 'pre_application',
					regions: 'north_east,north_east,wales',
					sector: 'BC08 - Leisure'
				},
				{ stage: 'acceptance', regions: 'south_west', sector: 'EN01 - Generating Stations' }
			]);
			expect(result).toEqual([
				{
					name: 'stage',
					label: 'Pre-application',
					value: 'pre_application',
					count: 2
				},
				{ name: 'stage', label: 'Acceptance', value: 'acceptance', count: 2 },
				{
					name: 'region',
					label: 'South East',
					value: 'south_east',
					count: 2
				},
				{
					name: 'region',
					label: 'North West',
					value: 'north_west',
					count: 1
				},
				{
					name: 'region',
					label: 'North East',
					value: 'north_east',
					count: 2
				},
				{ name: 'region', label: 'Wales', value: 'wales', count: 1 },
				{
					name: 'region',
					label: 'South West',
					value: 'south_west',
					count: 1
				},
				{ name: 'sector', label: 'Energy', value: 'energy', count: 2 },
				{
					name: 'sector',
					label: 'Business and Commercial',
					value: 'business_and_commercial',
					count: 2
				}
			]);
		});
	});

	describe('mapApplicationToApi', () => {
		describe('when applicant does not exist', () => {
			it('maps back office application data to api format', () => {
				const applicationWithoutApplicant = {
					...APPLICATION_DB,
					applicant: null
				};
				expect(mapApplicationToApi(applicationWithoutApplicant)).toEqual(
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
				expect(mapApplicationToApi(applicationWithApplicant)).toEqual(
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
			expect(mapApplicationToApi(undefined)).toEqual(undefined);
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
	describe('mapApplicationsToApi', () => {
		it('maps applications data to api format', () => {
			expect(mapApplicationsToApi([APPLICATION_DB])).toEqual([
				{
					...APPLICATION_API_V1,
					DateOfDCOAcceptance_NonAcceptance: null,
					sourceSystem: 'ODT'
				}
			]);
		});
	});
});
