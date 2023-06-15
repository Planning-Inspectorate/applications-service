const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const { getDocuments } = require('../../../src/controllers/documents.v3');
const {
	DB_DOCUMENTS,
	RESPONSE_FILTERS,
	RESPONSE_DOCUMENTS,
	DB_FILTERS
} = require('../../__data__/documents');

jest.mock('../../../src/services/document.ni.service');
const fetchDocumentsMock = require('../../../src/services/document.ni.service').fetchDocuments;
const getAvailableFiltersMock =
	require('../../../src/services/document.ni.service').getAvailableFilters;

describe('documentsV3 controller', () => {
	const res = httpMocks.createResponse();

	afterEach(() => {
		jest.resetAllMocks();
	});

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
			page: 1,
			itemsPerPage: 25
		};

		expect(fetchDocumentsMock).toBeCalledWith(expectedFilters);
		expect(getAvailableFiltersMock).toBeCalledWith('EN000001');

		expect(res._getStatusCode()).toEqual(StatusCodes.OK);
		expect(res._getData()).toEqual({
			documents: RESPONSE_DOCUMENTS,
			filters: RESPONSE_FILTERS,
			totalItems: 4,
			itemsPerPage: 25,
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
					size: 50,
					filters: [
						{
							name: 'category',
							value: "Developer's Application",
							type: [{ value: 'Plans' }, { value: 'Reports' }]
						}
					],
					searchTerm: 'search',
					datePublishedFrom: '2000-01-01',
					datePublishedTo: '2020-12-31'
				}
			},
			res
		);

		const expectedFilters = {
			caseReference: 'EN000001',
			page: 2,
			itemsPerPage: 50,
			filters: [
				{
					name: 'category',
					value: "Developer's Application",
					type: [{ value: 'Plans' }, { value: 'Reports' }]
				}
			],
			searchTerm: 'search',
			datePublishedFrom: '2000-01-01',
			datePublishedTo: '2020-12-31'
		};

		expect(fetchDocumentsMock).toBeCalledWith(expectedFilters);

		expect(res._getStatusCode()).toEqual(StatusCodes.OK);
		expect(res._getData()).toEqual({
			documents: RESPONSE_DOCUMENTS,
			filters: RESPONSE_FILTERS,
			totalItems: 4,
			itemsPerPage: 50,
			totalPages: 1,
			currentPage: 2
		});
	});

	it('limits itemsPerPage to 100', async () => {
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
					size: 101
				}
			},
			res
		);

		const expectedFilters = {
			caseReference: 'EN000001',
			page: 2,
			itemsPerPage: 100
		};

		expect(fetchDocumentsMock).toBeCalledWith(expectedFilters);

		expect(res._getStatusCode()).toEqual(StatusCodes.OK);
		expect(res._getData()).toEqual({
			documents: RESPONSE_DOCUMENTS,
			filters: RESPONSE_FILTERS,
			totalItems: 4,
			itemsPerPage: 100,
			totalPages: 1,
			currentPage: 2
		});
	});

	it('calculates the correct pagination', async () => {
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
					size: 2
				}
			},
			res
		);

		const expectedFilters = {
			caseReference: 'EN000001',
			page: 2,
			itemsPerPage: 2
		};

		expect(fetchDocumentsMock).toBeCalledWith(expectedFilters);

		expect(res._getStatusCode()).toEqual(StatusCodes.OK);
		expect(res._getData()).toEqual({
			documents: RESPONSE_DOCUMENTS,
			filters: RESPONSE_FILTERS,
			totalItems: 4,
			itemsPerPage: 2,
			totalPages: 2,
			currentPage: 2
		});
	});
});
