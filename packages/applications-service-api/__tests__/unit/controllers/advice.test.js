/* eslint-disable no-underscore-dangle */
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
	const mockAdvice = {
		adviceID: 'XX0123-Advice-00001',
		enquiryDate: '2020-02-19',
		enquiryMethod: 'Email',
		industrySector: 'Energy',
		caseReference: 'EN010009',
		firstName: 'Joe',
		lastName: 'Bloggs',
		organisation: 'The organisation',
		enquiryDetail: 'Do we need more energy',
		adviceGiven: 'Yes we do',
		respondedBy: 'Joe Bloggs',
		section1Enquiry: true,
		initiatedDate: '2016-04-28',
		dateEnquiryReceived: '2016-04-28 08:42:58',
		dateAdviceGiven: '2016-04-28',
		dateLastModified: '2016-04-28 08:42:58',
		dateCreated: '2016-04-28 08:42:58',
		attachments: [
			{
				documentDataID: 'XX0123-EN024303-00001',
				documentURI: '/pathname/to/document/or/blob/uri',
				mime: 'application/pdf',
				size: 50427
			}
		]
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should get advice by Id from mock', async () => {
		getAdviceByIdMock.mockResolvedValue(mockAdvice);

		const req = httpMocks.createRequest({
			params: {
				adviceID: 'adviceid123'
			}
		});
		const res = httpMocks.createResponse();
		await getAdviceById(req, res);

		expect(getAdviceByIdMock).toBeCalledWith('adviceid123');
		expect(res._getStatusCode()).toEqual(StatusCodes.OK);

		const advice = res._getData();
		expect(advice).toEqual({
			...mockAdvice,
			attachments: [
				{
					...mockAdvice.attachments[0],
					documentURI:
						'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects//pathname/to/document/or/blob/uri'
				}
			]
		});
	});
});
