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
		caseReference: 1
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
				caseReference: undefined,
				raw: true,
				where: { [Op.and]: [{ CaseReference: mockOptions.caseReference }] },
				order: [['DateRrepReceived', 'ASC'], ['PersonalName']]
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
				caseReference: undefined,
				raw: true,
				where: {
					[Op.and]: [
						{ CaseReference: mockOptionsWithType.caseReference },
						{ RepFrom: { [Op.in]: [mockOptionsWithType.type] } }
					]
				},
				order: [['DateRrepReceived', 'ASC'], ['PersonalName']]
			});
		});
		it('calls findAllAndCount with search term', async () => {
			// Arrange
			const mockOptionsWithSearchTerm = {
				...mockOptions,
				searchTerm: 'foo bar'
			};

			// Act
			await getRepresentationsWithCount(mockOptionsWithSearchTerm);
			// Assert
			expect(db.Representation.findAndCountAll).toBeCalledWith({
				...mockOptions,
				caseReference: undefined,
				raw: true,
				where: {
					[Op.and]: [
						{ CaseReference: mockOptionsWithSearchTerm.caseReference },
						{
							[Op.or]: [
								{
									[Op.or]: [
										{ PersonalName: { [Op.like]: `%foo%` } },
										{ RepresentationRedacted: { [Op.like]: `%foo%` } },
										{ Representative: { [Op.like]: `%foo%` } }
									]
								},
								{
									[Op.or]: [
										{ PersonalName: { [Op.like]: `%bar%` } },
										{ RepresentationRedacted: { [Op.like]: `%bar%` } },
										{ Representative: { [Op.like]: `%bar%` } }
									]
								}
							]
						}
					]
				},
				order: [['DateRrepReceived', 'ASC'], ['PersonalName']]
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
