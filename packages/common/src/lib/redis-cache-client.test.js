const { createClient } = require('redis');
const logger = require('./logger');

const { redisCacheClient, RedisCacheError } = require('./redis-cache-client');

jest.mock('redis', () => ({
	createClient: jest.fn()
}));

jest.mock('./logger', () => ({
	info: jest.fn(),
	error: jest.fn()
}));

describe('redis-cache-client.js', () => {
	let mockCacheClient;
	let eventHandlers;

	beforeEach(() => {
		jest.clearAllMocks();
		eventHandlers = {};

		mockCacheClient = {
			on: jest.fn((event, handler) => {
				eventHandlers[event] = handler;
			}),
			connect: jest.fn().mockResolvedValue(undefined)
		};

		createClient.mockReturnValue(mockCacheClient);
	});

	describe('RedisCacheError', () => {
		it('should create error with message and original error', () => {
			const originalError = new Error('original');
			const error = new RedisCacheError('test error', originalError);

			expect(error.message).toBe('test error');
			expect(error.name).toBe('RedisCacheError');
			expect(error).toBeInstanceOf(RedisCacheError);
			expect(error.originalError).toBe(originalError);
		});
	});

	describe('#redisCacheClient', () => {
		const validRedisConfig = {
			host: 'localhost',
			port: 6379,
			ssl: true,
			password: 'secret-password'
		};

		it('should throw RedisCacheError when redisConfig is not provided', async () => {
			await expect(redisCacheClient()).rejects.toThrow(RedisCacheError);
			await expect(redisCacheClient()).rejects.toThrow(
				'Redis cache configuration is required to initialize cache client'
			);
		});

		it('should create redis client with correct configuration', async () => {
			await redisCacheClient(validRedisConfig);

			expect(createClient).toHaveBeenCalledWith({
				socket: {
					host: 'localhost',
					port: 6379,
					tls: true
				},
				password: 'secret-password',
				pingInterval: 1000 * 60 * 5
			});
		});

		it('should register all event handlers', async () => {
			await redisCacheClient(validRedisConfig);

			expect(mockCacheClient.on).toHaveBeenCalledWith('connect', expect.any(Function));
			expect(mockCacheClient.on).toHaveBeenCalledWith('ready', expect.any(Function));
			expect(mockCacheClient.on).toHaveBeenCalledWith('end', expect.any(Function));
			expect(mockCacheClient.on).toHaveBeenCalledWith('error', expect.any(Function));
			expect(mockCacheClient.on).toHaveBeenCalledWith('reconnecting', expect.any(Function));
		});

		it('should call connect on the cache client', async () => {
			await redisCacheClient(validRedisConfig);

			expect(mockCacheClient.connect).toHaveBeenCalledTimes(1);
		});

		it('should return the cache client', async () => {
			const result = await redisCacheClient(validRedisConfig);

			expect(result).toBe(mockCacheClient);
		});

		describe('event handler messages', () => {
			it('should log info message on connect event', async () => {
				await redisCacheClient(validRedisConfig);

				eventHandlers.connect();

				expect(logger.info).toHaveBeenCalledWith('Initiating connection to redis cache client...');
			});

			it('should log info message on ready event', async () => {
				await redisCacheClient(validRedisConfig);

				eventHandlers.ready();

				expect(logger.info).toHaveBeenCalledWith('Connected to redis cache client successfully...');
			});

			it('should log info message on end event', async () => {
				await redisCacheClient(validRedisConfig);

				eventHandlers.end();

				expect(logger.info).toHaveBeenCalledWith('Disconnected from redis cache client...');
			});

			it('should log error message on error event', async () => {
				await redisCacheClient(validRedisConfig);
				const testError = new Error('Connection failed');

				eventHandlers.error(testError);

				expect(logger.error).toHaveBeenCalledWith(
					`Could not establish a connection with redis cache client: ${testError}`
				);
			});

			it('should log info message on reconnecting event', async () => {
				await redisCacheClient(validRedisConfig);

				eventHandlers.reconnecting();

				expect(logger.info).toHaveBeenCalledWith('Reconnecting to redis cache client...');
			});
		});

		describe('connection failure', () => {
			it('should propagate error when connect fails', async () => {
				const connectionError = new Error('Connection refused');
				mockCacheClient.connect.mockRejectedValue(connectionError);

				await expect(redisCacheClient(validRedisConfig)).rejects.toThrow('Connection refused');
			});
		});
	});
});
