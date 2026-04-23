const {
	buildApplicationsFiltersFromApplications,
	mapApplicationToApi,
	mapApplicationsToApi,
	addMapZoomLevelAndLongLat,
	mergeFilters,
	stageNameFromValue
} = require('../../../src/utils/application.mapper');
const {
	APPLICATIONS_BO_FILTER_COLUMNS,
	APPLICATIONS_FO_FILTERS,
	APPLICATION_FO,
	APPLICATION_API,
	APPLICATION_API_V1,
	APPLICATION_DB
} = require('../../__data__/application');

describe('application.mapper', () => {
	describe('buildApplicationsFiltersFromApplications', () => {
		it('maps applications from back office database to filters in api format', () => {
			const result = buildApplicationsFiltersFromApplications(APPLICATIONS_BO_FILTER_COLUMNS);
			expect(result).toEqual(APPLICATIONS_FO_FILTERS);
		});

		it('excludes undefined values from filter counts', () => {
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

		it('handles multiple regions in one application correctly', () => {
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

			it('maps anticipatedCloseOfExamination from ExaminationTimetable when present', () => {
				const application = {
					...APPLICATION_DB,
					applicant: null,
					stage: 'examination',
					ExaminationTimetable: [{ date: '2025-12-11' }]
				};
				const result = mapApplicationToApi(application);
				expect(result.anticipatedCloseOfExamination).toBe('2025-12-11');
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
			const result = mapApplicationsToApi([APPLICATION_DB]);
			expect(result[0]).toEqual(
				expect.objectContaining({
					...APPLICATION_API_V1,
					sourceSystem: 'ODT',
					DateOfReOpenRelevantRepresentationClose: undefined,
					DateOfReOpenRelevantRepresentationStart: undefined,
					deadlineForAcceptanceDecision: '2023-01-30',
					deadlineForDecision: null,
					deadlineForSubmissionOfRecommendation: null,
					isMaterialChange: undefined
				})
			);
		});
	});
	describe('mergeFilters', () => {
		it('Should accept two lists of filters with non-overlapping names and simply concatenate them', () => {
			const aFilters = [
				{
					name: 'name-a',
					value: 'value',
					label: 'Label',
					count: 1,
					label_cy: 'Label Cy'
				}
			];

			const bFilters = [
				{
					name: 'name-b',
					value: 'value',
					label: 'Label',
					count: 1,
					label_cy: 'Label Cy'
				}
			];

			expect(mergeFilters(aFilters, bFilters)).toEqual([...aFilters, ...bFilters]);
		});

		it('Should accept two lists of filters with non-overlapping values and simply concatenate them', () => {
			const aFilters = [
				{
					name: 'name',
					value: 'value-a',
					label: 'Label',
					count: 1,
					label_cy: 'Label Cy'
				}
			];

			const bFilters = [
				{
					name: 'name',
					value: 'value-b',
					label: 'Label',
					count: 1,
					label_cy: 'Label Cy'
				}
			];

			expect(mergeFilters(aFilters, bFilters)).toEqual([...aFilters, ...bFilters]);
		});

		it('Should combine the counts of any items with matching name AND value', () => {
			const filters = [
				{
					name: 'region',
					value: 'wales',
					label: 'Wales',
					count: 1,
					label_cy: 'Cymru'
				}
			];

			expect(mergeFilters(filters, filters)).toEqual([
				{
					name: 'region',
					value: 'wales',
					label: 'Wales',
					count: 2,
					label_cy: 'Cymru'
				}
			]);
		});
	});
	describe('stageNameFromValue', () => {
		it('Should return the correct string stage value for each corresponding integer value', () => {
			const expectedStageValues = [
				'draft',
				'pre_application',
				'acceptance',
				'pre_examination',
				'examination',
				'recommendation',
				'decision',
				'post_decision',
				'withdrawn'
			];

			expectedStageValues.forEach((stage, index) => {
				expect(stageNameFromValue(index)).toEqual(stage);
			});
		});
	});
});
