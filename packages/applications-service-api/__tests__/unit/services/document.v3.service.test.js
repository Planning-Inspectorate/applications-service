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
		it('calls query api with correct params and returns document rows and total count', async () => {
			mockFindAndCountAll.mockResolvedValueOnce({
				count: 4,
				rows: DB_DOCUMENTS.map((doc) => ({ dataValues: doc }))
			});

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
	});

	describe('getAvailableFilters', () => {
		it('calls query api with correct params and returns aggregated filter counts', async () => {
			mockFindAll.mockResolvedValueOnce(DB_FILTERS.map((filter) => ({ dataValues: filter })));

			const result = await getAvailableFilters({
				caseReference: 'EN010085'
			});

			const mockFindAllCall = mockFindAll.mock.calls[0][0];
			expect(mockFindAllCall.where[Op.and][0].case_reference).toEqual('EN010085');

			expect(result).toEqual(DB_FILTERS);
		});
	});
});
