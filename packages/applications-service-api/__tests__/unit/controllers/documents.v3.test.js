const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const { getDocuments } = require('../../../src/controllers/documents.v3');
const {
	DB_DOCUMENTS,
	RESPONSE_FILTERS,
	RESPONSE_DOCUMENTS,
	DB_FILTERS
} = require('../../__data__/documents');

jest.mock('../../../src/services/document.v3.service');
const fetchDocumentsMock = require('../../../src/services/document.v3.service').fetchDocuments;
const getAvailableFiltersMock =
	require('../../../src/services/document.v3.service').getAvailableFilters;

describe('documentsV3 controller', () => {
	const res = httpMocks.createResponse();

	it('returns documents and filters in correct format', async () => {
		fetchDocumentsMock.mockResolvedValueOnce({
			count: 4,
			rows: DB_DOCUMENTS
		});
		getAvailableFiltersMock.mockResolvedValueOnce(DB_FILTERS);

		await getDocuments(
			{
				body: {
					caseReference: 'EN000001'
				}
			},
			res
		);

		const expectedFilters = {
			caseReference: 'EN000001',
			page: 1
		};

		expect(fetchDocumentsMock).toBeCalledWith(expectedFilters);
		expect(getAvailableFiltersMock).toBeCalledWith('EN000001');

		expect(res._getStatusCode()).toEqual(StatusCodes.OK);
		expect(res._getData()).toEqual({
			documents: RESPONSE_DOCUMENTS,
			filters: RESPONSE_FILTERS,
			totalItems: 4,
			itemsPerPage: 20,
			totalPages: 1,
			currentPage: 1
		});
	});

	it('passes all request filters down to the service', async () => {
		fetchDocumentsMock.mockResolvedValueOnce({
			count: 4,
			rows: DB_DOCUMENTS
		});
		getAvailableFiltersMock.mockResolvedValueOnce(DB_FILTERS);

		await getDocuments(
			{
				body: {
					caseReference: 'EN000001',
					page: 2,
					filters: [
						{
							name: 'category',
							value: "Developer's Application",
							type: [{ value: 'Plans' }, { value: 'Reports' }]
						}
					],
					searchTerm: 'search',
					datePublishedFrom: '',
					datePublishedTo: ''
				}
			},
			res
		);

		const expectedFilters = {
			caseReference: 'EN000001',
			page: 1
		};

		expect(fetchDocumentsMock).toBeCalledWith(expectedFilters);
	});
});
