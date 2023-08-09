jest.mock('../../../src/repositories/document.backoffice.repository');
jest.mock('../../../src/utils/document.mapper');

const {
	getDocuments,
	getFilters,
	getDocumentsByType
} = require('../../../src/repositories/document.backoffice.repository');
const {
	BACK_OFFICE_DB_DOCUMENTS,
	RESPONSE_DOCUMENTS,
	DB_FILTERS,
	RESPONSE_FILTERS
} = require('../../__data__/documents');
const {
	fetchBackOfficeDocuments,
	fetchBackOfficeDocumentFilters,
	fetchBackOfficeDocumentsByType
} = require('../../../src/services/document.backoffice.service');
const { mapBackOfficeDocuments, mapFilters } = require('../../../src/utils/document.mapper');

describe('document back office service', () => {
	describe('fetchBackOfficeDocuments', () => {
		it('queries repository, invokes mapper with db data, then returns result', async () => {
			const filters = { caseReference: 'EN000001' };

			getDocuments.mockResolvedValueOnce({
				count: 1,
				rows: BACK_OFFICE_DB_DOCUMENTS
			});
			mapBackOfficeDocuments.mockReturnValueOnce(RESPONSE_DOCUMENTS);

			const result = await fetchBackOfficeDocuments(filters);

			expect(mapBackOfficeDocuments).toBeCalledWith(BACK_OFFICE_DB_DOCUMENTS);
			expect(result).toEqual({
				count: 1,
				data: RESPONSE_DOCUMENTS
			});
		});
	});

	describe('fetchBackOfficeDocumentFilters', () => {
		it('calls getFilters then passes result to mapper', async () => {
			getFilters.mockResolvedValueOnce(DB_FILTERS);
			mapFilters.mockReturnValueOnce(RESPONSE_FILTERS);

			const result = await fetchBackOfficeDocumentFilters('EN000001');

			expect(mapFilters).toBeCalledWith(DB_FILTERS);
			expect(result).toEqual(RESPONSE_FILTERS);
		});
	});

	describe('fetchBackOfficeDocumentsByType', () => {
		it('calls fetchBackOfficeDocumentsByType then passes result to repository', async () => {
			getDocumentsByType.mockResolvedValueOnce('mock data');

			const result = await fetchBackOfficeDocumentsByType('mock query');

			expect(getDocumentsByType).toBeCalledWith('mock query');
			expect(result).toEqual({ data: 'mock data' });
		});
	});
});
