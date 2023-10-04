const {
	getRepresentationsWithCount,
	getRepresentationById,
	getRepresentations
} = require('../../../src/repositories/representation.ni.repository');
const db = require('../../../src/models');
const { Op } = require('sequelize');

jest.mock('../../../src/models', () => ({
	Representation: {
		findAndCountAll: jest.fn(),
		findAll: jest.fn(),
		findOne: jest.fn()
	}
}));
describe('representation ni repository', () => {
	const mockRepresentations = [
		{
			ID: 1,
			ProjectName: 'foo'
		},
		{
			ID: 2,
			ProjectName: 'bar'
		}
	];
	const mockOptions = {
		offset: 0,
		limit: 10,
		applicationId: 1
	};
	describe('getRepresentationById', () => {
		const mockId = 10;
		const mockRepresentation = {
			ID: mockId,
			ProjectName: 'foo'
		};
		beforeAll(() => {
			// Arrange
			db.Representation.findOne.mockResolvedValue(mockRepresentation);
		});
		it('calls findOne with caseReference', async () => {
			// Act
			await getRepresentationById(mockId);
			// Assert
			expect(db.Representation.findOne).toBeCalledWith({ where: { ID: mockId }, raw: true });
		});
		it('returns the result of findOne', async () => {
			// Act
			const result = await getRepresentationById(mockId);
			// Assert
			expect(result).toEqual(mockRepresentation);
		});
	});

	describe('getRepresentationsWithCount', () => {
		beforeAll(() => {
			// Arrange
			db.Representation.findAndCountAll.mockResolvedValue({
				count: mockRepresentations.length,
				rows: mockRepresentations
			});
		});
		it('calls findAll with options', async () => {
			// Act
			await getRepresentationsWithCount(mockOptions);
			// Assert
			expect(db.Representation.findAndCountAll).toBeCalledWith({
				...mockOptions,
				applicationId: undefined,
				raw: true,
				where: { [Op.and]: [{ CaseReference: mockOptions.applicationId }] }
			});
		});
		it('calls findAllAndCount with type', async () => {
			// Arrange
			const mockOptionsWithType = {
				...mockOptions,
				type: 'foo'
			};
			// Act
			await getRepresentationsWithCount(mockOptionsWithType);
			// Assert
			expect(db.Representation.findAndCountAll).toBeCalledWith({
				...mockOptions,
				applicationId: undefined,
				raw: true,
				where: {
					[Op.and]: [
						{ CaseReference: mockOptionsWithType.applicationId },
						{ RepFrom: { [Op.in]: [mockOptionsWithType.type] } }
					]
				}
			});
		});
		it('calls findAllAndCount with search term', async () => {
			// Arrange
			const mockOptionsWithSearchTerm = {
				...mockOptions,
				searchTerm: 'foo'
			};

			// Act
			await getRepresentationsWithCount(mockOptionsWithSearchTerm);
			// Assert
			expect(db.Representation.findAndCountAll).toBeCalledWith({
				...mockOptions,
				applicationId: undefined,
				raw: true,
				where: {
					[Op.and]: [
						{ CaseReference: mockOptionsWithSearchTerm.applicationId },
						{
							[Op.or]: [
								{ PersonalName: { [Op.like]: `%${mockOptionsWithSearchTerm.searchTerm}%` } },
								{
									RepresentationRedacted: { [Op.like]: `%${mockOptionsWithSearchTerm.searchTerm}%` }
								},
								{ Representative: { [Op.like]: `%${mockOptionsWithSearchTerm.searchTerm}%` } }
							]
						}
					]
				}
			});
		});
		it('returns the result of findAllAndCount', async () => {
			// Act
			const result = await getRepresentationsWithCount(mockOptions);
			// Assert
			expect(result).toEqual({
				count: mockRepresentations.length,
				representations: mockRepresentations
			});
		});
	});

	describe('getRepresentations', () => {
		it('calls findAll with options', async () => {
			// Act
			await getRepresentations(mockOptions);
			// Assert
			expect(db.Representation.findAll).toBeCalledWith({ ...mockOptions, raw: true });
		});
		it('returns the result of findAll', async () => {
			// Arrange
			db.Representation.findAll.mockResolvedValue(mockRepresentations);
			// Act
			const result = await getRepresentations(mockOptions);
			// Assert
			expect(result).toEqual(mockRepresentations);
		});
	});
});
