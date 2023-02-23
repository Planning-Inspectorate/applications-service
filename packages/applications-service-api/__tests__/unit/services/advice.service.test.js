const SequelizeMock = require('sequelize-mock');
const { Op } = require('sequelize');

const { getAdvice } = require('../../../src/services/advice.service');

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

const dbMock = new SequelizeMock();
const Advice = dbMock.define('Advice');

const mockFindAndCountAll = jest.fn();
jest.mock('../../../src/models', () => ({
	Advice: {
		findAndCountAll: (query) => mockFindAndCountAll(query)
	}
}));

describe('getAdvice', () => {
	it('should get all advice from mock', async () => {
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
