const {
	getApplication,
	getAllApplications
} = require('../../../src/repositories/project.ni.repository');
const db = require('../../../src/models');
const { Op } = require('sequelize');

jest.mock('../../../src/models', () => ({
	Project: {
		findOne: jest.fn(),
		findAndCountAll: jest.fn()
	}
}));

describe('project ni repository', () => {
	describe('getApplication', () => {
		const mockProject = {
			CaseReference: 'EN010009',
			foo: 'bar'
		};
		beforeAll(() => {
			// Arrange
			db.Project.findOne.mockResolvedValue(mockProject);
		});
		it('calls findOne with caseReference', async () => {
			// Act
			await getApplication('EN010009');
			// Assert
			expect(db.Project.findOne).toBeCalledWith({ where: { CaseReference: 'EN010009' } });
		});
		it('returns the result of findOne', async () => {
			const result = await getApplication('EN010009');

			expect(result).toEqual(mockProject);
		});
	});

	describe('getAllApplications', () => {
		const mockProjects = [
			{
				CaseReference: 'EN010009',
				foo: 'bar'
			},
			{
				CaseReference: 'EN010010',
				foo: 'bar'
			}
		];
		const mockOptions = {
			offset: 0,
			limit: 10,
			raw: true
		};
		beforeAll(() => {
			// Arrange
			db.Project.findAndCountAll.mockResolvedValue({
				rows: mockProjects,
				count: mockProjects.length
			});
		});
		it('calls findAndCountAll with options', async () => {
			// Act
			await getAllApplications(mockOptions);
			// Assert
			expect(db.Project.findAndCountAll).toBeCalledWith({
				...mockOptions,
				where: {
					Region: { [Op.ne]: 'Wales' }
				}
			});
		});

		it('calls findAndCountAll with additional options in where clause', async () => {
			// Arrange
			const mockOptionsWithSearchTerm = {
				...mockOptions,
				searchTerm: 'foo',
				excludeNullDateOfSubmission: true
			};
			// Act
			await getAllApplications(mockOptionsWithSearchTerm);
			// Assert
			expect(db.Project.findAndCountAll).toBeCalledWith({
				...mockOptions,
				where: {
					Region: { [Op.ne]: 'Wales' },
					DateOfDCOSubmission: { [Op.gt]: 0, [Op.ne]: null },
					[Op.or]: [
						{
							[Op.or]: [
								{ CaseReference: { [Op.like]: '%foo%' } },
								{ ProjectName: { [Op.like]: '%foo%' } },
								{ PromoterName: { [Op.like]: '%foo%' } }
							]
						}
					]
				}
			});
		});
		it('returns the result of findAndCountAll', async () => {
			// Act
			const result = await getAllApplications(mockOptions);
			// Assert
			expect(result).toEqual({ applications: mockProjects, count: mockProjects.length });
		});
	});
});
