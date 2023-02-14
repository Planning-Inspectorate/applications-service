/* eslint-disable no-underscore-dangle */
const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const { getAdvice } = require('../../../src/controllers/advice');

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
	dateCreated: '2016-04-28 08:42:58'
};

const mockAttachment = {
	documentDataID: 'XX0123-EN024303-00001',
	documentURI: '/pathname/to/document/or/blob/uri',
	mime: 'application/pdf',
	size: 50427
};

jest.mock('../../../src/models', () => {
	// eslint-disable-next-line global-require
	const SequelizeMock = require('sequelize-mock');
	const dbMock = new SequelizeMock();
	const Advice = dbMock.define('Advice');
	const Attachment = dbMock.define('Attachment');

	Advice.findandCountAllWithAttachments = async () => {
		return {
			count: 1,
			rows: [Advice.build({ ...mockAdvice })]
		};
	};

	Attachment.findAllAttachments = async () => {
		return [Attachment.build({ ...mockAttachment, adviceID: 'XX0123-Advice-00001' })];
	};

	const db = {
		Advice,
		Attachment
	};
	return db;
});

describe('getAdvice', () => {
	it('should get all advice from mock with default query params', async () => {
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
		delete item.id;
		delete item.createdAt;
		delete item.updatedAt;
		const itemAttachment = item.attachments[0];
		delete itemAttachment.id;
		delete itemAttachment.createdAt;
		delete itemAttachment.updatedAt;

		expect(item).toEqual({
			...mockAdvice,
			attachments: [{ ...mockAttachment }]
		});
	});
});
