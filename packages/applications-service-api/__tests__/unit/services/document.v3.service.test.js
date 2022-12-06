const {
	fetchDocuments,
	getAvailableFilters
} = require('../../../src/services/document.v3.service');
const { DB_DOCUMENTS, DB_FILTERS } = require('../../__data__/documents');
const { Op } = require('sequelize');

const mockFindAndCountAll = jest.fn();
const mockFindAll = jest.fn();
jest.mock('../../../src/models', () => ({
	Document: {
		findAndCountAll: (query) => mockFindAndCountAll(query),
		findAll: (query) => mockFindAll(query)
	}
}));

describe('documentV3 service', () => {
	beforeEach(() => jest.resetAllMocks());

	describe('fetchDocuments', () => {
		beforeEach(() => {
			mockFindAndCountAll.mockResolvedValueOnce({
				count: 4,
				rows: DB_DOCUMENTS.map((doc) => ({ dataValues: doc }))
			});
		});

		it('calls query api with correct params and returns document rows and total count', async () => {
			const result = await fetchDocuments({
				caseReference: 'EN010085',
				page: 1
			});

			expect(mockFindAndCountAll).toBeCalledWith({
				limit: 20,
				offset: 0,
				order: [['date_published', 'DESC']],
				where: {
					[Op.and]: [{ case_reference: 'EN010085' }]
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
				filters: [
					{
						name: 'category',
						value: "Developer's Application",
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
				limit: 20,
				offset: 0,
				order: [['date_published', 'DESC']],
				where: {
					[Op.and]: [
						{ case_reference: 'EN010085' },
						{
							[Op.or]: [
								{ category: "Developer's Application", filter_1: ['Plans', 'Reports'] },
								{ stage: 1, filter_1: ['Deadline 2', 'Deadline 3'] }
							]
						}
					]
				}
			});
		});

		it('calls query api with searchTerm if it is specified', async () => {
			await fetchDocuments({
				caseReference: 'EN010085',
				page: 1,
				searchTerm: 'foo'
			});

			expect(mockFindAndCountAll).toBeCalledWith({
				limit: 20,
				offset: 0,
				order: [['date_published', 'DESC']],
				where: {
					[Op.and]: [
						{ case_reference: 'EN010085' },
						{
							[Op.or]: [
								{ description: { [Op.like]: '%foo%' } },
								{ personal_name: { [Op.like]: '%foo%' } },
								{ representative: { [Op.like]: '%foo%' } },
								{ mime: { [Op.like]: '%foo%' } }
							]
						}
					]
				}
			});
		});

		it('calls query api with searchTerm and stage filter when they are specified', async () => {
			await fetchDocuments({
				caseReference: 'EN010085',
				page: 1,
				searchTerm: 'foo',
				filters: [
					{
						name: 'stage',
						value: 1,
						type: [{ value: 'Deadline 2' }, { value: 'Deadline 3' }]
					}
				]
			});

			expect(mockFindAndCountAll).toBeCalledWith({
				limit: 20,
				offset: 0,
				order: [['date_published', 'DESC']],
				where: {
					[Op.and]: [
						{ case_reference: 'EN010085' },
						{
							[Op.or]: [
								{ description: { [Op.like]: '%foo%' } },
								{ personal_name: { [Op.like]: '%foo%' } },
								{ representative: { [Op.like]: '%foo%' } },
								{ mime: { [Op.like]: '%foo%' } }
							]
						},
						{
							[Op.or]: [{ stage: 1, filter_1: ['Deadline 2', 'Deadline 3'] }]
						}
					]
				}
			});
		});

		it('sets correct offset when page number >1 is requested', async () => {
			await fetchDocuments({
				caseReference: 'EN010085',
				page: 2
			});

			expect(mockFindAndCountAll).toBeCalledWith(
				expect.objectContaining({
					offset: 20
				})
			);
		});
	});

	describe('getAvailableFilters', () => {
		it('calls query api with correct params and returns aggregated filter counts', async () => {
			mockFindAll.mockResolvedValueOnce(DB_FILTERS.map((filter) => ({ dataValues: filter })));

			const result = await getAvailableFilters('EN010085');

			const mockFindAllCall = mockFindAll.mock.calls[0][0];
			expect(mockFindAllCall.where[Op.and][0].case_reference).toEqual('EN010085');

			expect(result).toEqual(DB_FILTERS);
		});
	});
});
