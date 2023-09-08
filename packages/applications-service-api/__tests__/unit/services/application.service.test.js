const {
	getApplication,
	getAllApplications,
	getAllApplicationsDownload
} = require('../../../src/services/application.service');
const {
	getApplication: getApplicationRepository,
	getAllApplications: getAllApplicationsRepository,
	getAllApplicationsCount: getAllApplicationsCountRepository
} = require('../../../src/repositories/project.ni.repository');
const mapApplicationsToCSV = require('../../../src/utils/map-applications-to-csv');
const {
	APPLICATION_FO,
	APPLICATIONS_NI_DB,
	APPLICATIONS_FO
} = require('../../__data__/application');

jest.mock('../../../src/repositories/project.ni.repository', () => ({
	getApplication: jest.fn(),
	getAllApplications: jest.fn(),
	getAllApplicationsCount: jest.fn()
}));

jest.mock('../../../src/utils/map-applications-to-csv', () => jest.fn());

describe('application.service', () => {
	describe('getApplication', () => {
		const mockCaseReference = 'EN000001';
		it('calls getApplicationRepository with caseReference id', async () => {
			// Arrange
			getApplicationRepository.mockResolvedValueOnce({ dataValues: APPLICATION_FO });
			// Act
			await getApplication(mockCaseReference);
			// Assert
			expect(getApplicationRepository).toHaveBeenCalledWith(mockCaseReference);
		});

		it('returns result', async () => {
			// Arrange
			getApplicationRepository.mockResolvedValueOnce({ dataValues: APPLICATION_FO });
			// Act
			const result = await getApplication(mockCaseReference);
			// Assert
			expect(result).toEqual({
				...APPLICATION_FO,
				MapZoomLevel: 6,
				LatLong: undefined,
				LongLat: ['-0.70283147423378', '53.620078025496']
			});
		});
	});

	describe('getAllApplications', () => {
		const mockCount = 100;
		let availableFilters = [];
		beforeEach(() => {
			getAllApplicationsRepository
				.mockResolvedValueOnce(availableFilters)
				.mockResolvedValueOnce(APPLICATIONS_NI_DB);
			getAllApplicationsCountRepository.mockResolvedValueOnce(mockCount);
		});
		describe('pagination', () => {
			describe('when page num', () => {
				describe('is provided', () => {
					it('calls findAll with offset', async () => {
						// Arrange
						const mockPageNum = 2;
						const mockPageSize = 25;

						// Act
						await getAllApplications({ page: mockPageNum, size: mockPageSize });
						// Assert
						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: mockPageSize * (mockPageNum - 1),
							limit: mockPageSize,
							order: [['ProjectName', 'ASC']]
						});
					});
				});
				describe('is not provided', () => {
					it('calls findAll with offset 0', async () => {
						// Arrange
						const mockPageSize = 25;
						// Act
						await getAllApplications({ size: mockPageSize });
						// Assert
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
						// Arrange
						const mockPageSize = 25;
						// Act
						await getAllApplications({ size: mockPageSize });
						// Assert
						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							limit: mockPageSize,
							order: [['ProjectName', 'ASC']]
						});
					});
				});
				describe('is provided over 100', () => {
					it('calls findAll with limit 100', async () => {
						// Act
						await getAllApplications({ size: 101 });
						// Assert
						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							limit: 100,
							order: [['ProjectName', 'ASC']]
						});
					});
				});
				describe('is not provided', () => {
					it('calls findAll with default limit 25', async () => {
						// Act
						await getAllApplications({});
						// Assert
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
						['ConfirmedDateOfDecision'],
						['Stage']
					])('calls findAll with order: [[key, ASC]]', async (sort) => {
						// Act
						await getAllApplications({ sort });
						// Assert
						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							limit: 25,
							order: [[sort, 'ASC']]
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
						['+Stage', [['Stage', 'ASC']]],
						['-Stage', [['Stage', 'DESC']]]
					])('calls findAll with order', async (sort, order) => {
						// Act
						await getAllApplications({ sort });
						// Assert
						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							limit: 25,
							order
						});
					});
				});
				describe('when sort key is invalid', () => {
					it('calls findAll with default order', async () => {
						// Act
						await getAllApplications({ sort: 'foo' });
						// Assert
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
					// Act
					await getAllApplications({});
					// Assert
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
				await getAllApplications({
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

		it('calls getAllApplicationsCountRepository', async () => {
			// Act
			await getAllApplications({});
			// Assert
			expect(getAllApplicationsCountRepository).toHaveBeenCalled();
		});
		it('returns result', async () => {
			// Act
			const result = await getAllApplications({});
			// Assert
			expect(result).toEqual({
				applications: APPLICATIONS_FO,
				totalItems: mockCount,
				itemsPerPage: 25,
				totalPages: 4,
				currentPage: 1,
				filters: availableFilters
			});
		});
	});

	describe('getAllApplicationsDownload', () => {
		const mockResult = 'csv-foo';
		beforeEach(() => {
			getAllApplicationsRepository.mockResolvedValueOnce(APPLICATIONS_NI_DB);
			mapApplicationsToCSV.mockResolvedValueOnce(mockResult);
		});
		it('calls getAllApplicationsRepository', async () => {
			// Act
			await getAllApplicationsDownload();
			// Assert
			expect(getAllApplicationsRepository).toHaveBeenCalled();
		});
		it('calls mapApplicationsToCSV with applications', async () => {
			// Act
			await getAllApplicationsDownload();
			// Assert
			expect(mapApplicationsToCSV).toHaveBeenCalledWith(APPLICATIONS_FO);
		});
		it('returns result', async () => {
			// Act
			const result = await getAllApplicationsDownload();
			// Assert
			expect(result).toEqual(mockResult);
		});
	});
});