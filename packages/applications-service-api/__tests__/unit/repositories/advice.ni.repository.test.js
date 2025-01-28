const {
	getAllAdviceByCaseReference,
	getAdviceById
} = require('../../../src/repositories/advice.ni.repository');
const { ADVICE_NI_DATA } = require('../../__data__/advice');
const db = require('../../../src/models');
const { Op } = require('sequelize');

jest.mock('../../../src/models');

describe('advice.ni.repository', () => {
	describe('getAllAdviceByCaseReference', () => {
		beforeAll(() => {
			db.Advice.findAndCountAll.mockResolvedValue({
				count: 1,
				rows: ADVICE_NI_DATA
			});
		});

		it('should call the database with the correct parameters', async () => {
			await getAllAdviceByCaseReference('ni', 0, 100, 'search Term');
			expect(db.Advice.findAndCountAll).toHaveBeenCalledWith({
				where: {
					[Op.and]: [
						{ caseReference: 'ni' },
						{
							[Op.or]: [
								{
									[Op.and]: [
										{ firstName: { [Op.like]: '%search%' } },
										{ firstName: { [Op.like]: '%Term%' } }
									]
								},
								{
									[Op.and]: [
										{ lastName: { [Op.like]: '%search%' } },
										{ lastName: { [Op.like]: '%Term%' } }
									]
								},
								{
									[Op.and]: [
										{ organisation: { [Op.like]: '%search%' } },
										{ organisation: { [Op.like]: '%Term%' } }
									]
								},
								{
									[Op.and]: [
										{ enquiryDetail: { [Op.like]: '%search%' } },
										{ enquiryDetail: { [Op.like]: '%Term%' } }
									]
								},
								{
									[Op.and]: [
										{ adviceGiven: { [Op.like]: '%search%' } },
										{ adviceGiven: { [Op.like]: '%Term%' } }
									]
								}
							]
						}
					]
				},
				order: [['dateAdviceGiven', 'DESC'], ['adviceID']],
				offset: 0,
				limit: 100,
				raw: true
			});
		});
		it('should return the correct data', async () => {
			const result = await getAllAdviceByCaseReference('ni');
			expect(result).toEqual({
				count: 1,
				advice: ADVICE_NI_DATA
			});
		});
	});
	describe('getAdviceById', () => {
		beforeAll(() => {
			db.Advice.findOne.mockResolvedValue(ADVICE_NI_DATA[0]);
		});
		it('should call the database with the correct parameters', async () => {
			await getAdviceById('ni');
			expect(db.Advice.findOne).toHaveBeenCalledWith({
				where: {
					adviceID: 'ni'
				},
				raw: true
			});
		});
		it('should return the correct data', async () => {
			const result = await getAdviceById('ni');
			expect(result).toEqual(ADVICE_NI_DATA[0]);
		});
	});
});
