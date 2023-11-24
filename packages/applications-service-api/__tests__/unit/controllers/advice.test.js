const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const { getAdvice, getAdviceById } = require('../../../src/controllers/advice');
const { getAllAdvice } = require('../../../src/services/advice.service');
const {
	getAdviceById: getAdviceByIdMock,
	getAllAdvice: getAllAdviceMock
} = require('../../../src/services/advice.service');
const { ADVICE_BACKOFFICE_RESPONSE } = require('../../__data__/advice');
const ApiError = require('../../../src/error/apiError');
jest.mock('../../../src/services/advice.service', () => ({
	getAllAdvice: jest.fn(),
	getAdviceById: jest.fn()
}));

describe('getAdvice', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('getAdviceById', () => {
		beforeEach(() => {
			getAllAdviceMock.mockResolvedValue({
				advice: ADVICE_BACKOFFICE_RESPONSE,
				totalItems: 1,
				itemsPerPage: 25,
				totalPages: 1,
				currentPage: 1
			});
		});
		it('should return 400 if caseRef is missing', async () => {
			const req = httpMocks.createRequest({
				query: {}
			});
			const res = httpMocks.createResponse();
			await expect(() => getAdvice(req, res)).rejects.toEqual(
				ApiError.badRequest('missing required parameter: caseRef')
			);
		});

		it('should call getAllAdviceService', async () => {
			const req = httpMocks.createRequest({
				query: {
					caseRef: 'EN010009'
				}
			});
			const res = httpMocks.createResponse();
			await getAdvice(req, res);
			expect(getAllAdvice).toBeCalledWith({
				caseRef: 'EN010009'
			});
		});
		it('should return advice from service', async () => {
			const req = httpMocks.createRequest({
				query: {
					caseRef: 'EN010009'
				}
			});
			const res = httpMocks.createResponse();
			await getAdvice(req, res);
			expect(res._getStatusCode()).toEqual(StatusCodes.OK);
			expect(res._getData()).toEqual({
				advice: ADVICE_BACKOFFICE_RESPONSE,
				totalItems: 1,
				itemsPerPage: 25,
				totalPages: 1,
				currentPage: 1
			});
		});
		it('should return a 500 error if an unhandled error occurs', async () => {
			getAllAdviceMock.mockRejectedValue(new Error('some error'));
			const res = httpMocks.createResponse();
			const req = httpMocks.createRequest({
				query: {
					caseRef: 'EN010009'
				}
			});
			await expect(() => getAdvice(req, res)).rejects.toEqual(new Error('some error'));
		});
	});

	describe('getAdviceById', () => {
		beforeEach(() => {
			getAdviceByIdMock.mockResolvedValue(ADVICE_BACKOFFICE_RESPONSE);
		});
		it('should call getAdviceByIdService', async () => {
			const req = httpMocks.createRequest({
				params: {
					adviceID: '123'
				},
				query: {
					caseReference: 'EN010009'
				}
			});
			const res = httpMocks.createResponse();
			await getAdviceById(req, res);
			expect(getAdviceByIdMock).toBeCalledWith('123', 'EN010009');
		});
		it('should return advice from service', async () => {
			const req = httpMocks.createRequest({
				params: {
					adviceID: '123'
				},
				query: {
					caseReference: 'EN010009'
				}
			});
			const res = httpMocks.createResponse();
			await getAdviceById(req, res);
			expect(res._getStatusCode()).toEqual(StatusCodes.OK);
			expect(res._getData()).toEqual(ADVICE_BACKOFFICE_RESPONSE);
		});
	});
});
