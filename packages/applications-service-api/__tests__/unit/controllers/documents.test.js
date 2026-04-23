const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const {
	getDocumentByCaseReference,
	getDocumentLinkByDocumentReference
} = require('../../../src/controllers/documents');
const { RESPONSE_DOCUMENTS } = require('../../__data__/documents');
const {
	fetchDocumentsByType,
	fetchDocumentByDocRef
} = require('../../../src/services/document.service');
jest.mock('../../../src/services/document.service');

describe('documentsV3 controller', () => {
	let res;
	beforeEach(() => {
		res = httpMocks.createResponse();
	});
	afterEach(() => {
		jest.resetAllMocks();
	});
	it('returns a BO document for the case ref and type', async () => {
		fetchDocumentsByType.mockResolvedValueOnce({ data: RESPONSE_DOCUMENTS[0] });

		await getDocumentByCaseReference(
			{
				params: { caseReference: 'BC0110001' },
				query: { type: 'RULE_6_LETTER' }
			},
			res
		);

		expect(fetchDocumentsByType).toHaveBeenCalledWith({
			caseReference: 'BC0110001',
			type: 'RULE_6_LETTER'
		});

		expect(res._getStatusCode()).toEqual(StatusCodes.OK);
		expect(res._getData()).toEqual(RESPONSE_DOCUMENTS[0]);
	});

	describe('getDocumentByCaseReference', () => {
		describe('NI', () => {
			it('returns a NI document for the case ref and type (Rule 6 Letter)', async () => {
				fetchDocumentsByType.mockResolvedValueOnce({ data: RESPONSE_DOCUMENTS[0] });
				await getDocumentByCaseReference(
					{
						params: { caseReference: 'EN000001' },
						query: { type: 'RULE_6_LETTER' }
					},
					res
				);
				expect(fetchDocumentsByType).toHaveBeenCalledWith({
					caseReference: 'EN000001',
					type: 'RULE_6_LETTER'
				});

				expect(res._getStatusCode()).toEqual(StatusCodes.OK);
				expect(res._getData()).toEqual(RESPONSE_DOCUMENTS[0]);
			});

			it('returns a NI document for the case ref and type (Rule 8 Letter)', async () => {
				fetchDocumentsByType.mockResolvedValueOnce({ data: RESPONSE_DOCUMENTS[0] });
				await getDocumentByCaseReference(
					{
						params: { caseReference: 'EN000001' },
						query: { type: 'RULE_8_LETTER' }
					},
					res
				);
				expect(fetchDocumentsByType).toHaveBeenCalledWith({
					caseReference: 'EN000001',
					type: 'RULE_8_LETTER'
				});

				expect(res._getStatusCode()).toEqual(StatusCodes.OK);
				expect(res._getData()).toEqual(RESPONSE_DOCUMENTS[0]);
			});
		});
		describe('BO', () => {
			it('returns a BO document for the case ref and type', async () => {
				fetchDocumentsByType.mockResolvedValueOnce({ data: RESPONSE_DOCUMENTS[0] });

				await getDocumentByCaseReference(
					{
						params: { caseReference: 'BC0110001' },
						query: { type: 'RULE_6_LETTER' }
					},
					res
				);

				expect(fetchDocumentsByType).toHaveBeenCalledWith({
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

			fetchDocumentByDocRef.mockResolvedValueOnce([{ path: mockPath }]);

			await getDocumentLinkByDocumentReference(
				{
					params: { docRef }
				},
				res
			);

			expect(fetchDocumentByDocRef).toHaveBeenCalledWith(docRef);
			expect(res._getStatusCode()).toBe(StatusCodes.OK);
			expect(JSON.parse(res._getData())).toEqual({ path: mockPath });
		});

		it('returns 404 if no document is found', async () => {
			fetchDocumentByDocRef.mockResolvedValueOnce([]);

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
			fetchDocumentByDocRef.mockResolvedValueOnce([{ path: null }]);

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
