/* eslint-disable no-underscore-dangle */
const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const { getAdvice } = require('../../../src/controllers/advice');

jest.mock('../../../src/services/advice.service');
const { getAdvice: getAdviceMock } = require('../../../src/services/advice.service');

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

describe('getAdvice', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should get all advice from mock with default query params', async () => {
		getAdviceMock.mockResolvedValue({
			count: 1,
			rows: [mockAdvice]
		});

		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse();
		await getAdvice(req, res);

		const data = res._getData();
		const { advice, totalItems, itemsPerPage, totalPages, currentPage } = data;

		expect(res._getStatusCode()).toEqual(StatusCodes.OK);
		expect(totalItems).toBe(1);
		expect(itemsPerPage).toBe(25);
		expect(totalPages).toBe(1);
		expect(currentPage).toBe(1);

		expect(advice.length).toBe(1);

		const item = advice[0];
		expect(item).toEqual(mockAdvice);
	});

	it('passes request Query params down to service', async () => {
		getAdviceMock.mockResolvedValue({
			count: 1,
			rows: [mockAdvice]
		});

		const req = httpMocks.createRequest({
			query: {
				caseRef: 'EN010116',
				searchTerm: 'test 123',
				size: '50',
				page: '2'
			}
		});
		const res = httpMocks.createResponse();
		await getAdvice(req, res);

		expect(getAdviceMock).toBeCalledWith({
			caseReference: 'EN010116',
			searchTerm: 'test 123',
			itemsPerPage: 50,
			page: 2
		});
	});

	it('limits itemsPerPage to 100', async () => {
		getAdviceMock.mockResolvedValueOnce({
			count: 2,
			rows: [mockAdvice, mockAdvice]
		});

		const req = httpMocks.createRequest({
			query: {
				caseRef: 'EN010116',
				size: '101',
				page: '2'
			}
		});
		const res = httpMocks.createResponse();

		await getAdvice(req, res);

		const expectedFilters = {
			caseReference: 'EN010116',
			page: 2,
			itemsPerPage: 100
		};

		expect(getAdviceMock).toBeCalledWith(expectedFilters);

		expect(res._getStatusCode()).toEqual(StatusCodes.OK);
		expect(res._getData()).toEqual({
			advice: [mockAdvice, mockAdvice],
			totalItems: 2,
			itemsPerPage: 100,
			totalPages: 1,
			currentPage: 2
		});
	});

	it('calculates the correct pagination', async () => {
		getAdviceMock.mockResolvedValueOnce({
			count: 2,
			rows: [mockAdvice, mockAdvice]
		});

		const req = httpMocks.createRequest({
			query: {
				caseRef: 'EN010116',
				size: '1',
				page: '2'
			}
		});
		const res = httpMocks.createResponse();

		await getAdvice(req, res);

		const expectedFilters = {
			caseReference: 'EN010116',
			page: 2,
			itemsPerPage: 1
		};

		expect(getAdviceMock).toBeCalledWith(expectedFilters);

		expect(res._getStatusCode()).toEqual(StatusCodes.OK);
		expect(res._getData()).toEqual({
			advice: [mockAdvice, mockAdvice],
			totalItems: 2,
			itemsPerPage: 1,
			totalPages: 2,
			currentPage: 2
		});
	});
});
