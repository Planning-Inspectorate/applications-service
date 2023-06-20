jest.mock('../../../src/repositories/document.ni.repository');
jest.mock('../../../src/utils/document.mapper');

const {
	fetchDocuments,
	getAvailableFilters
} = require('../../../src/repositories/document.ni.repository');
const {
	DB_DOCUMENTS,
	RESPONSE_DOCUMENTS,
	DB_FILTERS,
	RESPONSE_FILTERS
} = require('../../__data__/documents');
const { mapDocuments, mapFilters } = require('../../../src/utils/document.mapper');
const {
	fetchNIDocuments,
	fetchNIDocumentFilters
} = require('../../../src/services/document.ni.service');

describe('document ni service', () => {
	describe('fetchNIDocuments', () => {
		it('queries repository, invokes mapper with db data, then returns result', async () => {
			const filters = { caseReference: 'EN000001' };

			fetchDocuments.mockResolvedValueOnce({
				count: 1,
				rows: DB_DOCUMENTS
			});
			mapDocuments.mockReturnValueOnce(RESPONSE_DOCUMENTS);

			const result = await fetchNIDocuments(filters);

			expect(mapDocuments).toBeCalledWith(DB_DOCUMENTS);
			expect(result).toEqual({
				count: 1,
				data: RESPONSE_DOCUMENTS
			});
		});
	});

	describe('fetchNIDocumentFilters', () => {
		it('calls getFilters then passes result to mapper', async () => {
			getAvailableFilters.mockResolvedValueOnce(DB_FILTERS);
			mapFilters.mockReturnValueOnce(RESPONSE_FILTERS);

			const result = await fetchNIDocumentFilters('EN000001');

			expect(mapFilters).toBeCalledWith(DB_FILTERS);
			expect(result).toEqual(RESPONSE_FILTERS);
		});
	});
});
