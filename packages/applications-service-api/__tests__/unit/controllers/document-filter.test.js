/* eslint-disable no-underscore-dangle */
const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const { getV2Documents } = require('../../../src/controllers/documents');

const { getFilters, getOrderedDocuments } = require('../../../src/services/document.service');

jest.mock('../../../src/services/document.service');

getFilters.mockImplementation(() => Promise.resolve([]));
getOrderedDocuments.mockImplementation(() => Promise.resolve({ rows: [], count: 0 }));

describe('getV2Documents', () => {
	it('should return empty list when type if everything_else no document exist', async () => {
		const req = httpMocks.createRequest({
			query: {
				caseRef: 'EN000000',
				type: ['everything_else']
			}
		});

		const res = httpMocks.createResponse();
		await getV2Documents(req, res);
		expect(res._getStatusCode()).toEqual(StatusCodes.OK);
		expect(res._getData()).toEqual({
			documents: [],
			totalItems: 0,
			itemsPerPage: 20,
			totalPages: 1,
			currentPage: 1,
			filters: {
				stageFilters: [],
				typeFilters: [],
				categoryFilters: []
			}
		});
	});
});
