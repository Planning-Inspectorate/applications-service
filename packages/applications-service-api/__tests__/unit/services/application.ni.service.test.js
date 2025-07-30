const {
	getNIApplication,
	getAllNIApplications,
	getAllNIApplicationsDownload
} = require('../../../src/services/application.ni.service');
const {
	getApplication: getApplicationRepository,
	getAllApplications: getAllApplicationsRepository
} = require('../../../src/repositories/project.ni.repository');
const { mapApplicationsToCSV } = require('../../../src/utils/map-applications-to-csv');
const {
	APPLICATION_FO,
	APPLICATIONS_NI_DB,
	APPLICATIONS_FO,
	APPLICATIONS_FO_FILTERS
} = require('../../__data__/application');

jest.mock('../../../src/repositories/project.ni.repository', () => ({
	getApplication: jest.fn(),
	getAllApplications: jest.fn()
}));

jest.mock('../../../src/utils/map-applications-to-csv', () => ({
	mapApplicationsToCSV: jest.fn()
}));

describe('application.ni.service', () => {
	describe('getApplication', () => {
		const mockCaseReference = 'EN000001';

		it('calls getApplicationRepository with caseReference id', async () => {
			getApplicationRepository.mockResolvedValueOnce({ dataValues: APPLICATION_FO });

			await getNIApplication(mockCaseReference);

			expect(getApplicationRepository).toHaveBeenCalledWith(mockCaseReference);
		});

		it('returns result', async () => {
			getApplicationRepository.mockResolvedValueOnce({ dataValues: APPLICATION_FO });

			const result = await getNIApplication(mockCaseReference);

			expect(result).toEqual({
				...APPLICATION_FO,
				MapZoomLevel: 1,
				LatLong: undefined,
				LongLat: ['-0.7028315466694124', '53.620079146110655']
			});
		});
	});

	describe('getAllApplications', () => {
		beforeEach(() => {
			getAllApplicationsRepository
				.mockResolvedValueOnce({
					applications: APPLICATIONS_NI_DB,
					count: APPLICATIONS_NI_DB.length
				})
				.mockResolvedValueOnce({
					applications: APPLICATIONS_NI_DB,
					count: APPLICATIONS_NI_DB.length
				});
		});

		describe('pagination', () => {
			describe('when page num', () => {
				describe('is provided', () => {
					it('calls findAll with offset', async () => {
						const mockPageNum = 2;
						const mockPageSize = 25;

						await getAllNIApplications({ page: mockPageNum, size: mockPageSize });

						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: mockPageSize * (mockPageNum - 1),
							limit: mockPageSize,
							order: [['ProjectName', 'ASC']]
						});
					});
				});

				describe('is not provided', () => {
					it('calls findAll with offset 0', async () => {
						const mockPageSize = 25;

						await getAllNIApplications({ size: mockPageSize });

						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							limit: mockPageSize,
							order: [['ProjectName', 'ASC']]
						});
					});
				});
			});

			describe('when page size', () => {
				describe('is provided under 100', () => {
					it('calls findAll with limit', async () => {
						const mockPageSize = 25;

						await getAllNIApplications({ size: mockPageSize });

						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							limit: mockPageSize,
							order: [['ProjectName', 'ASC']]
						});
					});
				});

				describe('is provided over 100', () => {
					it('calls findAll with limit 100', async () => {
						await getAllNIApplications({ size: 101 });

						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							limit: 100,
							order: [['ProjectName', 'ASC']]
						});
					});
				});

				describe('is not provided', () => {
					it('calls findAll with default limit 25', async () => {
						await getAllNIApplications({});

						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							limit: 25,
							order: [['ProjectName', 'ASC']]
						});
					});
				});
			});
		});

		describe('sorting', () => {
			describe('when sort is provided', () => {
				describe('when sort has key but no direction', () => {
					it.each([
						['ProjectName'],
						['PromoterName'],
						['DateOfDCOSubmission'],
						['ConfirmedDateOfDecision']
					])('calls findAll with order: [[key, ASC]]', async (sort) => {
						await getAllNIApplications({ sort });

						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							limit: 25,
							order: [[sort, 'ASC']]
						});
					});

					it('when sort key is stage, calls findAll with secondary sort projectName', async () => {
						// Act
						await getAllNIApplications({ sort: 'Stage' });
						// Assert
						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							limit: 25,
							order: [
								['Stage', 'ASC'],
								['ProjectName', 'ASC']
							]
						});
					});
				});

				describe('when sort has key and direction', () => {
					it.each([
						['+ProjectName', [['ProjectName', 'ASC']]],
						['-ProjectName', [['ProjectName', 'DESC']]],
						['+PromoterName', [['PromoterName', 'ASC']]],
						['-PromoterName', [['PromoterName', 'DESC']]],
						['+DateOfDCOSubmission', [['DateOfDCOSubmission', 'ASC']]],
						['-DateOfDCOSubmission', [['DateOfDCOSubmission', 'DESC']]],
						['+ConfirmedDateOfDecision', [['ConfirmedDateOfDecision', 'ASC']]],
						['-ConfirmedDateOfDecision', [['ConfirmedDateOfDecision', 'DESC']]],
						[
							'+Stage',
							[
								['Stage', 'ASC'],
								['ProjectName', 'ASC']
							]
						],
						[
							'-Stage',
							[
								['Stage', 'DESC'],
								['ProjectName', 'ASC']
							]
						]
					])('calls findAll with order', async (sort, order) => {
						await getAllNIApplications({ sort });

						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							limit: 25,
							order
						});
					});
				});

				describe('when sort key is invalid', () => {
					it('calls findAll with default order', async () => {
						await getAllNIApplications({ sort: 'foo' });

						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							limit: 25,
							order: [['ProjectName', 'ASC']]
						});
					});
				});
			});

			describe('when sort is not provided', () => {
				it('calls findAll with default order', async () => {
					await getAllNIApplications({});

					expect(getAllApplicationsRepository).toHaveBeenCalledWith({
						offset: 0,
						limit: 25,
						order: [['ProjectName', 'ASC']]
					});
				});
			});
		});

		describe('filtering', () => {
			it('passes applied filters to repository in format for NI database', async () => {
				await getAllNIApplications({
					stage: ['pre_application', 'acceptance'],
					region: ['eastern'],
					sector: ['transport', 'energy']
				});

				expect(getAllApplicationsRepository).toHaveBeenCalledWith({
					offset: 0,
					limit: 25,
					order: [['ProjectName', 'ASC']],
					filters: {
						stage: [1, 2],
						region: ['Eastern'],
						sector: ['TR', 'EN']
					}
				});
			});
		});

		describe('searching', () => {
			it('passes search term to repository', async () => {
				await getAllNIApplications({ searchTerm: 'foo' });

				expect(getAllApplicationsRepository).toHaveBeenCalledWith({
					offset: 0,
					limit: 25,
					order: [['ProjectName', 'ASC']],
					searchTerm: 'foo'
				});
			});
		});

		it('returns result', async () => {
			const result = await getAllNIApplications({});

			expect(result).toEqual({
				applications: APPLICATIONS_FO,
				totalItems: APPLICATIONS_FO.length,
				itemsPerPage: 25,
				totalPages: 1,
				currentPage: 1,
				totalItemsWithoutFilters: APPLICATIONS_FO.length,
				filters: APPLICATIONS_FO_FILTERS
			});
		});
	});

	describe('getAllApplicationsDownload', () => {
		const mockResult = 'csv-foo';

		beforeEach(() => {
			getAllApplicationsRepository.mockResolvedValueOnce({ applications: APPLICATIONS_NI_DB });
			mapApplicationsToCSV.mockResolvedValueOnce(mockResult);
		});

		it('calls getAllApplicationsRepository', async () => {
			await getAllNIApplicationsDownload();

			expect(getAllApplicationsRepository).toHaveBeenCalled();
		});

		it('calls mapApplicationsToCSV with applications', async () => {
			await getAllNIApplicationsDownload();

			expect(mapApplicationsToCSV).toHaveBeenCalledWith(APPLICATIONS_FO);
		});

		it('returns result', async () => {
			const result = await getAllNIApplicationsDownload();

			expect(result).toEqual(mockResult);
		});
	});
});
