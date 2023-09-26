jest.mock('../../lib/logger', () => jest.fn());

const mockPrismaClientOn = jest.fn();
const mockPrismaClient = jest.fn().mockImplementation(() => ({
	$on: mockPrismaClientOn
}));
jest.mock('@prisma/client', () => ({
	PrismaClient: mockPrismaClient
}));

describe('prisma client', () => {
	afterEach(() => {
		jest.resetModules();
	});

	it('sets up debug prisma client', () => {
		jest.mock('../../config', function () {
			return {
				isProduction: false
			};
		});

		require('../../lib/prisma');

		expect(mockPrismaClient).toBeCalledWith({
			log: [{ emit: 'event', level: 'query' }, 'info', 'warn', 'error']
		});
		expect(mockPrismaClientOn).toHaveBeenCalledWith('query', expect.any(Function));
	});

	it('sets up production prisma client', () => {
		jest.mock('../../config', function () {
			return {
				isProduction: true
			};
		});

		require('../../lib/prisma');

		expect(mockPrismaClient).toBeCalledWith({
			log: ['query', 'info', 'warn', 'error']
		});
	});
});
