const { parseRedisConnectionString } = require('./redis');

describe('redis utils', () => {
	describe('parseRedisConnectionString', () => {
		const validConnectionString =
			'some.example.org:6380,password=some_password,ssl=True,abortConnect=False';

		it('parses valid connection string correctly', () => {
			const result = parseRedisConnectionString(validConnectionString);

			expect(result).toEqual({
				host: 'some.example.org',
				port: 6380,
				password: 'some_password',
				ssl: true,
				abortConnect: false
			});
		});

		it('throws error if connection string contains too few parts', () => {
			expect(() => {
				parseRedisConnectionString('not,valid');
			}).toThrowError(
				"Redis connection string not in expected format (4 parts comma separated): 'some.example.org:6380,password=some_password,ssl=True,abortConnect=False'"
			);
		});

		it('throws error if connection string contains too many parts', () => {
			expect(() => {
				parseRedisConnectionString('not,valid,too,many,parts');
			}).toThrowError(
				"Redis connection string not in expected format (4 parts comma separated): 'some.example.org:6380,password=some_password,ssl=True,abortConnect=False'"
			);
		});

		it('throws error if connection string contains hostname but not port', () => {
			expect(() => {
				parseRedisConnectionString(
					'example.org,password=some_password,ssl=True,abortConnect=False'
				);
			}).toThrowError(
				"Hostname and port not in expected format (separated by colon): 'some.example.org:6380'"
			);
		});

		it('throws error if connection string contains port but not hostname', () => {
			expect(() => {
				parseRedisConnectionString('6380,password=some_password,ssl=True,abortConnect=False');
			}).toThrowError(
				"Hostname and port not in expected format (separated by colon): 'some.example.org:6380'"
			);
		});
	});
});
