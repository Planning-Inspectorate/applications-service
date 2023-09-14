const { request } = require('../__data__/supertest');
const { Op } = require('sequelize');
const { REPRESENTATION_NI_DB } = require('../__data__/representation');

const mockFindAndCountAll = jest.fn();
const mockFindAll = jest.fn();
const mockFindOne = jest.fn();
jest.mock('../../src/models', () => ({
	Representation: {
		findAndCountAll: (query) => mockFindAndCountAll(query),
		findAll: (query) => mockFindAll(query),
		findOne: (query) => mockFindOne(query)
	}
}));

describe('api/v1/representations', () => {
	describe('get single representation by id', () => {
		it('happy path', async () => {
			// Arrange
			mockFindOne.mockResolvedValue(REPRESENTATION_NI_DB);
			// Act
			const response = await request.get('/api/v1/representations/2');
			// Assert
			expect(mockFindOne).toBeCalledWith({ where: { ID: '2' } });
			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				ID: 2,
				ProjectName: 'bar'
			});
		});
	});
	describe('get all representations by application id', () => {
		it('happy path', () => {
			expect(true).toEqual(false);
		});
		it('with type filters', () => {
			expect(true).toEqual(false);
		});
		it('with search term', () => {
			expect(true).toEqual(false);
		});
		it('with type filters and search term', () => {
			expect(true).toEqual(false);
		});
	});
});
