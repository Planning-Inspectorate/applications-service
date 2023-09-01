const { getApplication, getAllApplications } = require('../../../src/services/application.service');
const db = require('../../../src/models');

jest.mock('../../../src/models', () => ({
	Project: {
		findOne: jest.fn(),
		findAll: jest.fn(),
		count: jest.fn()
	}
}));
describe('application.service', () => {
	describe('getApplication', () => {
		const mockCaseReference = 'EN000001';
		it('calls db.Project.findOne with caseReference id', async () => {
			// Act
			await getApplication(mockCaseReference);
			// Assert
			expect(db.Project.findOne).toHaveBeenCalledWith({
				where: { CaseReference: mockCaseReference }
			});
		});

		it('returns result', async () => {
			// Arrange
			const mockProject = { foo: 'bar' };
			db.Project.findOne.mockResolvedValueOnce(mockProject);
			// Act
			const result = await getApplication(mockCaseReference);
			// Assert
			expect(result).toEqual(mockProject);
		});
	});
	describe('getAllApplications', () => {
		const mockCount = 100;
		const mockApplications = [{ foo: 'bar' }];
		beforeEach(() => {
			db.Project.count.mockResolvedValueOnce(mockCount);
			db.Project.findAll.mockResolvedValueOnce(mockApplications);
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
						expect(db.Project.findAll).toHaveBeenCalledWith({
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
						expect(db.Project.findAll).toHaveBeenCalledWith({
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
						expect(db.Project.findAll).toHaveBeenCalledWith({
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
						expect(db.Project.findAll).toHaveBeenCalledWith({
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
						expect(db.Project.findAll).toHaveBeenCalledWith({
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
						expect(db.Project.findAll).toHaveBeenCalledWith({
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
						expect(db.Project.findAll).toHaveBeenCalledWith({
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
						expect(db.Project.findAll).toHaveBeenCalledWith({
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
					expect(db.Project.findAll).toHaveBeenCalledWith({
						offset: 0,
						limit: 25,
						order: [['ProjectName', 'ASC']]
					});
				});
			});
		});

		it('calls db.Project.count', async () => {
			// Act
			await getAllApplications({});
			// Assert
			expect(db.Project.count).toHaveBeenCalled();
		});
		it('returns result', async () => {
			// Act
			const result = await getAllApplications({});
			// Assert
			expect(result).toEqual({
				applications: mockApplications,
				totalItems: mockCount,
				itemsPerPage: 25,
				totalPages: 4,
				currentPage: 1
			});
		});
	});
});
