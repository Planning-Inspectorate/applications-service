const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const { getDocumentByCaseReference } = require('../../../src/controllers/documents');
const { RESPONSE_DOCUMENTS } = require('../../__data__/documents');
const { fetchDocumentsByType } = require('../../../src/services/document.service');
jest.mock('../../../src/services/document.service');

describe('documents controller', () => {
	const res = httpMocks.createResponse();
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
