/* eslint-disable no-underscore-dangle */
const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const { getV2Documents } = require('../../../src/controllers/documents');

const { getFilters, getOrderedDocuments } = require('../../../src/services/document.service');

jest.mock('../../../src/services/document.service');

getFilters.mockImplementation(() => Promise.resolve([]));
getOrderedDocuments.mockImplementation(() => Promise.resolve({ rows: [] }));

describe('getV2Documents', () => {
  it('should return no documents found when type if everything_else no document exist', async () => {
    const req = httpMocks.createRequest({
      query: {
        caseRef: 'EN000000',
        type: ['everything_else'],
      },
    });

    const res = httpMocks.createResponse();
    await getV2Documents(req, res);
    expect(res._getStatusCode()).toEqual(StatusCodes.NOT_FOUND);
    expect(res._getData()).toEqual({
      code: StatusCodes.NOT_FOUND,
      errors: ['No documents found'],
    });
  });
});
