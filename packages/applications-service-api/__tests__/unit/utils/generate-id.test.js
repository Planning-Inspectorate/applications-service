const uuid = require('uuid');
const { generateId } = require('../../../src/utils/generate-id');
jest.mock('uuid');

describe('generateId', () => {
	beforeAll(() => {
		uuid.v4.mockReturnValue('3aab2cf4c4d34e3e8');
	});

	it('generates a unique id', () => {
		const id = generateId('F');
		expect(id).toEqual('F3AAB2CF4');
	});
});
