const {
	fetchDocuments,
	getAvailableFilters,
	fetchDocumentsByDocumentType
} = require('../../../src/repositories/document.ni.repository');
const { DB_DOCUMENTS, DB_FILTERS } = require('../../__data__/documents');
const { Op } = require('sequelize');

const mockFindAndCountAll = jest.fn();
const mockFindAll = jest.fn();
const mockFindOne = jest.fn();
jest.mock('../../../src/models', () => ({
	Document: {
		findAndCountAll: (query) => mockFindAndCountAll(query),
		findAll: (query) => mockFindAll(query),
		findOne: (query) => mockFindOne(query)
	}
}));

const FILTER_1_NOT_EMPTY_STATEMENT = { filter_1: { [Op.ne]: null } };
const STAGE_NOT_EMPTY_OR_0_STATEMENT = { stage: { [Op.and]: [{ [Op.ne]: null }, { [Op.ne]: 0 }] } };

describe('documentV3 service', () => {
	beforeEach(() => jest.resetAllMocks());

	describe('fetchDocuments', () => {
		const expectedQuery = {
			limit: 25,
			offset: 0,
			order: [['date_published', 'DESC'], ['id']]
		};

		beforeEach(() => {
			mockFindAndCountAll.mockResolvedValueOnce({
				count: 4,
				rows: DB_DOCUMENTS.map((doc) => ({ dataValues: doc }))
			});
		});

		it('calls query api with correct params and returns document rows and total count', async () => {
			const result = await fetchDocuments({
				caseReference: 'EN010085',
				page: 1,
				itemsPerPage: 25
			});

			expect(mockFindAndCountAll).toBeCalledWith({
				...expectedQuery,
				where: {
					[Op.and]: [{ case_reference: 'EN010085' }, STAGE_NOT_EMPTY_OR_0_STATEMENT]
				}
			});

			expect(result).toEqual({
				count: 4,
				rows: DB_DOCUMENTS
			});
		});

		it('calls query api with filters if they are specified', async () => {
			await fetchDocuments({
				caseReference: 'EN010085',
				page: 1,
				itemsPerPage: 25,
				filters: [
					{
						name: 'category',
						value: "Developer's application",
						type: [{ value: 'Plans' }, { value: 'Reports' }]
					},
					{
						name: 'stage',
						value: 1,
						type: [{ value: 'Deadline 2' }, { value: 'Deadline 3' }]
					}
				]
			});

			expect(mockFindAndCountAll).toBeCalledWith({
				...expectedQuery,
				where: {
					[Op.and]: [
						{ case_reference: 'EN010085' },
						STAGE_NOT_EMPTY_OR_0_STATEMENT,
						{
							[Op.or]: [
								{ category: "Developer's application", filter_1: ['Plans', 'Reports'] },
								{ stage: 1, filter_1: ['Deadline 2', 'Deadline 3'] }
							]
						}
					]
				}
			});
		});

		it('calls query api with a split and filtered searchTerm if it is specified', async () => {
			await fetchDocuments({
				caseReference: 'EN010085',
				page: 1,
				itemsPerPage: 25,
				searchTerm: 'a search term'
			});

			expect(mockFindAndCountAll).toBeCalledWith({
				...expectedQuery,
				where: {
					[Op.and]: [
						{ case_reference: 'EN010085' },
						STAGE_NOT_EMPTY_OR_0_STATEMENT,
						{
							[Op.or]: [
								{
									[Op.and]: [
										{ description: { [Op.like]: '%search%' } },
										{ description: { [Op.like]: '%term%' } }
									]
								},
								{
									[Op.and]: [
										{ personal_name: { [Op.like]: '%search%' } },
										{ personal_name: { [Op.like]: '%term%' } }
									]
								},
								{
									[Op.and]: [
										{ representative: { [Op.like]: '%search%' } },
										{ representative: { [Op.like]: '%term%' } }
									]
								},
								{
									[Op.and]: [{ mime: { [Op.like]: '%search%' } }, { mime: { [Op.like]: '%term%' } }]
								}
							]
						}
					]
				}
			});
		});

		it('calls query api with datePublishedFrom if it is specified', async () => {
			await fetchDocuments({
				caseReference: 'EN010085',
				page: 1,
				itemsPerPage: 25,
				datePublishedFrom: '2000-01-01'
			});

			expect(mockFindAndCountAll).toBeCalledWith({
				...expectedQuery,
				where: {
					[Op.and]: [
						{ case_reference: 'EN010085' },
						STAGE_NOT_EMPTY_OR_0_STATEMENT,
						{
							date_published: {
								[Op.gte]: '2000-01-01'
							}
						}
					]
				}
			});
		});

		it('calls query api with datePublishedTo if it is specified', async () => {
			await fetchDocuments({
				caseReference: 'EN010085',
				page: 1,
				itemsPerPage: 25,
				datePublishedTo: '2023-12-31'
			});

			expect(mockFindAndCountAll).toBeCalledWith({
				...expectedQuery,
				where: {
					[Op.and]: [
						{ case_reference: 'EN010085' },
						STAGE_NOT_EMPTY_OR_0_STATEMENT,
						{
							date_published: {
								[Op.lte]: '2023-12-31'
							}
						}
					]
				}
			});
		});

		it('calls query api with datePublishedFrom and datePublishedTo if they are specified', async () => {
			await fetchDocuments({
				caseReference: 'EN010085',
				page: 1,
				itemsPerPage: 25,
				datePublishedFrom: '2000-01-01',
				datePublishedTo: '2023-12-31'
			});

			expect(mockFindAndCountAll).toBeCalledWith({
				...expectedQuery,
				where: {
					[Op.and]: [
						{ case_reference: 'EN010085' },
						STAGE_NOT_EMPTY_OR_0_STATEMENT,
						{
							date_published: {
								[Op.between]: ['2000-01-01', '2023-12-31']
							}
						}
					]
				}
			});
		});

		it('calls query api with a split and filtered searchTerm and stage filter when they are specified', async () => {
			await fetchDocuments({
				caseReference: 'EN010085',
				page: 1,
				itemsPerPage: 25,
				searchTerm: 'a search term',
				filters: [
					{
						name: 'stage',
						value: 1,
						type: [{ value: 'Deadline 2' }, { value: 'Deadline 3' }]
					}
				]
			});

			expect(mockFindAndCountAll).toBeCalledWith({
				...expectedQuery,
				where: {
					[Op.and]: [
						{ case_reference: 'EN010085' },
						STAGE_NOT_EMPTY_OR_0_STATEMENT,
						{
							[Op.or]: [
								{
									[Op.and]: [
										{ description: { [Op.like]: '%search%' } },
										{ description: { [Op.like]: '%term%' } }
									]
								},
								{
									[Op.and]: [
										{ personal_name: { [Op.like]: '%search%' } },
										{ personal_name: { [Op.like]: '%term%' } }
									]
								},
								{
									[Op.and]: [
										{ representative: { [Op.like]: '%search%' } },
										{ representative: { [Op.like]: '%term%' } }
									]
								},
								{
									[Op.and]: [{ mime: { [Op.like]: '%search%' } }, { mime: { [Op.like]: '%term%' } }]
								}
							]
						},
						{
							[Op.or]: [{ stage: 1, filter_1: ['Deadline 2', 'Deadline 3'] }]
						}
					]
				}
			});
		});

		it('calls query api without filter_1 if filter does not include type', async () => {
			await fetchDocuments({
				caseReference: 'EN010085',
				page: 1,
				itemsPerPage: 25,
				filters: [
					{
						name: 'stage',
						value: 1
					}
				]
			});

			expect(mockFindAndCountAll).toBeCalledWith({
				...expectedQuery,
				where: {
					[Op.and]: [
						{ case_reference: 'EN010085' },
						STAGE_NOT_EMPTY_OR_0_STATEMENT,
						{
							[Op.or]: [{ stage: 1 }]
						}
					]
				}
			});
		});

		it('sets correct offset when page number >1 is requested', async () => {
			await fetchDocuments({
				caseReference: 'EN010085',
				page: 2,
				itemsPerPage: 25
			});

			expect(mockFindAndCountAll).toBeCalledWith(
				expect.objectContaining({
					offset: 25,
					limit: 25
				})
			);
		});
	});

	describe('getAvailableFilters', () => {
		it('calls query api with correct params and returns aggregated filter counts', async () => {
			mockFindAll.mockResolvedValueOnce(DB_FILTERS.map((filter) => ({ dataValues: filter })));

			const result = await getAvailableFilters('EN010085');

			const mockInvocation = mockFindAll.mock.calls[0][0];

			expect(mockInvocation.where).toEqual({
				[Op.and]: [
					{ case_reference: 'EN010085' },
					STAGE_NOT_EMPTY_OR_0_STATEMENT,
					FILTER_1_NOT_EMPTY_STATEMENT
				]
			});

			expect(result).toEqual(DB_FILTERS);
		});
	});

	describe('fetchDocumentsByDocumentType', () => {
		it('calls query api with correct params and returns document that matches the type', async () => {
			mockFindOne.mockReturnValue({ data: 'mock data' });
			const result = await fetchDocumentsByDocumentType({
				caseReference: 'mock case ref',
				type: 'mock type'
			});

			expect(mockFindOne).toHaveBeenCalledWith({
				order: [['date_created', 'desc']],
				where: {
					case_reference: 'mock case ref',
					type: 'mock type'
				}
			});
			expect(result).toEqual({ data: 'mock data' });
		});
	});
});
