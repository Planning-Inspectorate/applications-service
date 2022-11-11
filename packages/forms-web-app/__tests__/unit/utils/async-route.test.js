const { asyncRoute } = require('../../../src/utils/async-route');

describe('async-route helper', () => {
	it('should throw error if route throws error', async () => {
		const error = new Error('some error');

		// eslint-disable-next-line no-unused-vars
		const route = async (req, res) => {
			await Promise.resolve(); // some example async function
			throw error;
		};

		await expect(asyncRoute(route)).rejects.toThrowError(error);
	});

	it('should throw error if route returns rejected promise', () => {
		const error = new Error('some error');

		// eslint-disable-next-line no-unused-vars
		const route = async (req, res) => {
			await Promise.reject(error);
		};

		expect(asyncRoute(route)).rejects.toThrowError(error);
	});
});
