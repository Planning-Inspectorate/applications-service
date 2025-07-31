const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const {
	getNIDocuments,
	getDocumentByCaseReference,
	getDocumentLinkByDocumentReference
} = require('../../../src/controllers/documents.v3');
const { RESPONSE_FILTERS, RESPONSE_DOCUMENTS } = require('../../__data__/documents');
const {
	fetchBackOfficeDocumentsByType,
	fetchBackOfficeDocumentByDocRef
} = require('../../../src/services/document.backoffice.service');
const { fetchNIDocumentsByType } = require('../../../src/services/document.ni.service');
const { isBackOfficeCaseReference } = require('../../../src/utils/is-backoffice-case-reference');

jest.mock('../../../src/utils/is-backoffice-case-reference');
jest.mock('../../../src/services/document.ni.service');
jest.mock('../../../src/services/document.backoffice.service');
const fetchNIDocumentsMock = require('../../../src/services/document.ni.service').fetchNIDocuments;
const fetchNIDocumentFiltersMock =
	require('../../../src/services/document.ni.service').fetchNIDocumentFilters;

describe('documentsV3 controller', () => {
	let res;
	beforeEach(() => {
		res = httpMocks.createResponse();
		isBackOfficeCaseReference.mockImplementation((caseReference) => caseReference === 'BC0110001');
	});
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('getNIDocuments', () => {
		it('returns documents and filters in correct format', async () => {
			fetchNIDocumentsMock.mockResolvedValueOnce({
				count: 4,
				data: RESPONSE_DOCUMENTS
			});
			fetchNIDocumentFiltersMock.mockResolvedValueOnce(RESPONSE_FILTERS);

			await getNIDocuments(
				{
					body: {
						caseReference: 'EN000001',
						isMaterialChange: false
					}
				},
				res
			);

			const expectedFilters = {
				caseReference: 'EN000001',
				page: 1,
				itemsPerPage: 25
			};

			expect(fetchNIDocumentsMock).toBeCalledWith(expectedFilters, false);
			expect(fetchNIDocumentFiltersMock).toBeCalledWith('EN000001', false);

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
			fetchNIDocumentsMock.mockResolvedValueOnce({
				count: 4,
				data: RESPONSE_DOCUMENTS
			});
			fetchNIDocumentFiltersMock.mockResolvedValueOnce(RESPONSE_FILTERS);

			await getNIDocuments(
				{
					body: {
						caseReference: 'EN000001',
						page: 2,
						size: 50,
						filters: [
							{
								name: 'category',
								value: "Developer's application",
								type: [{ value: 'Plans' }, { value: 'Reports' }]
							}
						],
						searchTerm: 'search',
						datePublishedFrom: '2000-01-01',
						datePublishedTo: '2020-12-31',
						isMaterialChange: true
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
						value: "Developer's application",
						type: [{ value: 'Plans' }, { value: 'Reports' }]
					}
				],
				searchTerm: 'search',
				datePublishedFrom: '2000-01-01',
				datePublishedTo: '2020-12-31'
			};

			expect(fetchNIDocumentsMock).toBeCalledWith(expectedFilters, true);

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
			fetchNIDocumentsMock.mockResolvedValueOnce({
				count: 4,
				data: RESPONSE_DOCUMENTS
			});
			fetchNIDocumentFiltersMock.mockResolvedValueOnce(RESPONSE_FILTERS);

			await getNIDocuments(
				{
					body: {
						caseReference: 'EN000001',
						page: 2,
						size: 101,
						isMaterialChange: false
					}
				},
				res
			);

			const expectedFilters = {
				caseReference: 'EN000001',
				page: 2,
				itemsPerPage: 100
			};

			expect(fetchNIDocumentsMock).toBeCalledWith(expectedFilters, false);

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
			fetchNIDocumentsMock.mockResolvedValueOnce({
				count: 4,
				data: RESPONSE_DOCUMENTS
			});
			fetchNIDocumentFiltersMock.mockResolvedValueOnce(RESPONSE_FILTERS);

			await getNIDocuments(
				{
					body: {
						caseReference: 'EN000001',
						page: 2,
						size: 2,
						isMaterialChange: false
					}
				},
				res
			);

			const expectedFilters = {
				caseReference: 'EN000001',
				page: 2,
				itemsPerPage: 2
			};

			expect(fetchNIDocumentsMock).toBeCalledWith(expectedFilters, false);

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

	describe('getDocumentByCaseReference', () => {
		describe('NI', () => {
			it('returns a NI document for the case ref and type (Rule 6 Letter)', async () => {
				fetchNIDocumentsByType.mockResolvedValueOnce({ data: RESPONSE_DOCUMENTS[0] });
				await getDocumentByCaseReference(
					{
						params: { caseReference: 'EN000001' },
						query: { type: 'RULE_6_LETTER' }
					},
					res
				);
				expect(fetchNIDocumentsByType).toHaveBeenCalledWith({
					caseReference: 'EN000001',
					type: 'RULE_6_LETTER'
				});

				expect(res._getStatusCode()).toEqual(StatusCodes.OK);
				expect(res._getData()).toEqual(RESPONSE_DOCUMENTS[0]);
			});

			it('returns a NI document for the case ref and type (Rule 8 Letter)', async () => {
				fetchNIDocumentsByType.mockResolvedValueOnce({ data: RESPONSE_DOCUMENTS[0] });
				await getDocumentByCaseReference(
					{
						params: { caseReference: 'EN000001' },
						query: { type: 'RULE_8_LETTER' }
					},
					res
				);
				expect(fetchNIDocumentsByType).toHaveBeenCalledWith({
					caseReference: 'EN000001',
					type: 'RULE_8_LETTER'
				});

				expect(res._getStatusCode()).toEqual(StatusCodes.OK);
				expect(res._getData()).toEqual(RESPONSE_DOCUMENTS[0]);
			});
		});
		describe('BO', () => {
			it('returns a BO document for the case ref and type', async () => {
				fetchBackOfficeDocumentsByType.mockResolvedValueOnce({ data: RESPONSE_DOCUMENTS[0] });

				await getDocumentByCaseReference(
					{
						params: { caseReference: 'BC0110001' },
						query: { type: 'RULE_6_LETTER' }
					},
					res
				);

				expect(fetchBackOfficeDocumentsByType).toHaveBeenCalledWith({
					caseReference: 'BC0110001',
					type: 'RULE_6_LETTER'
				});

				expect(res._getStatusCode()).toEqual(StatusCodes.OK);
				expect(res._getData()).toEqual(RESPONSE_DOCUMENTS[0]);
			});
		});
	});
	describe('getDocumentLinkByDocumentReference', () => {
		it('returns the document URI path for valid document reference', async () => {
			const docRef = 'B0123456-000001';
			const mockPath = 'https:example.com/myDocument.pdf';

			fetchBackOfficeDocumentByDocRef.mockResolvedValueOnce([{ path: mockPath }]);

			await getDocumentLinkByDocumentReference(
				{
					params: { docRef }
				},
				res
			);

			expect(fetchBackOfficeDocumentByDocRef).toHaveBeenCalledWith(docRef);
			expect(res._getStatusCode()).toBe(StatusCodes.OK);
			expect(res._getData()).toBe(mockPath);
		});

		it('returns 404 if no document is found', async () => {
			fetchBackOfficeDocumentByDocRef.mockResolvedValueOnce([]);

			await getDocumentLinkByDocumentReference(
				{
					params: { docRef: 'B0123456-000002' }
				},
				res
			);

			expect(res._getStatusCode()).toBe(StatusCodes.NOT_FOUND);
			expect(res._getData()).toBe('Document not found');
		});

		it('returns 404 if document has no path', async () => {
			fetchBackOfficeDocumentByDocRef.mockResolvedValueOnce([{ path: null }]);

			await getDocumentLinkByDocumentReference(
				{
					params: { docRef: 'B0123456-000003' }
				},
				res
			);

			expect(res._getStatusCode()).toBe(StatusCodes.NOT_FOUND);
			expect(res._getData()).toBe('Document not found');
		});
	});
});
