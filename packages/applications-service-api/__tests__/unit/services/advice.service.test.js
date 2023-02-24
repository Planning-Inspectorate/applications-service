const SequelizeMock = require('sequelize-mock');
const { Op } = require('sequelize');

const { getAdvice, getAdviceById } = require('../../../src/services/advice.service');

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

const dbMock = new SequelizeMock();
const Advice = dbMock.define('Advice');
const Attachment = dbMock.define('Attachment');

const mockFindAndCountAll = jest.fn();
const mockFindOne = jest.fn();
const mockFindAllAttachments = jest.fn();
jest.mock('../../../src/models', () => ({
	Advice: {
		findAndCountAll: (query) => mockFindAndCountAll(query),
		findOne: (query) => mockFindOne(query)
	},
	Attachment: {
		findAllAttachments: (query) => mockFindAllAttachments(query)
	}
}));

describe('Advice Service', () => {
	describe('getAdvice', () => {
		it('should get all advice from mock model', async () => {
			mockFindAndCountAll.mockResolvedValueOnce({
				count: 1,
				rows: [Advice.build({ ...mockAdvice })]
			});

			const { count, rows } = await getAdvice({
				itemsPerPage: 25,
				page: 1
			});

			expect(count).toBe(1);

			expect(rows.length).toBe(1);
			const item = rows[0];
			delete item.id;
			delete item.createdAt;
			delete item.updatedAt;

			expect(item).toEqual({
				...mockAdvice
			});
		});

		it('sets correct offset when page number >1 is requested', async () => {
			mockFindAndCountAll.mockResolvedValueOnce({
				count: 1,
				rows: [Advice.build({ ...mockAdvice })]
			});

			await getAdvice({
				page: 2,
				itemsPerPage: 25
			});

			expect(mockFindAndCountAll).toBeCalledWith(
				expect.objectContaining({
					offset: 25,
					limit: 25
				})
			);
		});

		it('builds the caseReference query', async () => {
			mockFindAndCountAll.mockResolvedValueOnce({
				count: 1,
				rows: [Advice.build({ ...mockAdvice })]
			});

			await getAdvice({
				itemsPerPage: 25,
				page: 1,
				caseReference: 'EN010085'
			});

			expect(mockFindAndCountAll).toHaveBeenCalledWith({
				where: {
					[Op.and]: [{ caseReference: 'EN010085' }, {}]
				},
				limit: 25,
				offset: 0,
				order: [['dateAdviceGiven', 'DESC'], ['adviceID']]
			});
		});

		it('builds the searchTerm query', async () => {
			mockFindAndCountAll.mockResolvedValueOnce({
				count: 1,
				rows: [Advice.build({ ...mockAdvice })]
			});

			await getAdvice({
				itemsPerPage: 25,
				page: 1,
				caseReference: 'EN010085',
				searchTerm: 'testing 123'
			});

			expect(mockFindAndCountAll).toHaveBeenCalledWith({
				where: {
					[Op.and]: [
						{ caseReference: 'EN010085' },
						{
							[Op.or]: [
								{ firstName: { [Op.like]: '%testing 123%' } },
								{ lastName: { [Op.like]: '%testing 123%' } },
								{ organisation: { [Op.like]: '%testing 123%' } },
								{ enquiryDetail: { [Op.like]: '%testing 123%' } },
								{ adviceGiven: { [Op.like]: '%testing 123%' } }
							]
						}
					]
				},
				limit: 25,
				offset: 0,
				order: [['dateAdviceGiven', 'DESC'], ['adviceID']]
			});
		});
	});

	describe('getAdviceById', () => {
		it('should get advice from mock model', async () => {
			mockFindOne.mockResolvedValueOnce(Advice.build({ ...mockAdvice }));
			mockFindAllAttachments.mockResolvedValueOnce([Attachment.build({ ...mockAttachment })]);

			const advice = await getAdviceById('adviceid123');
			delete advice.id;
			delete advice.createdAt;
			delete advice.updatedAt;
			const attachment = advice.attachments[0];
			delete attachment.id;
			delete attachment.createdAt;
			delete attachment.updatedAt;

			expect(advice).toEqual({
				...mockAdvice,
				attachments: [{ ...mockAttachment }]
			});
		});
	});
});
