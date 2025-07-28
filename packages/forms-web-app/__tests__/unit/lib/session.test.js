const { configureSessionStore } = require('../../../src/lib/session');
const realConfig = require('../../../src/config');
const { createClient } = require('redis');
const session = require('express-session');

jest.mock('express-session');
jest.mock('redis');

let config;

const mockCreateClientOnFn = jest.fn();
const mockCreateClientConnectFn = jest.fn();

describe('lib/session', () => {
	describe('configureSessionStore', () => {
		beforeEach(() => {
			config = require('../../../src/config');

			createClient.mockImplementation(() => ({
				// eslint-disable-next-line no-unused-vars
				on: (event, callback) => mockCreateClientOnFn(event, callback),
				connect: () => mockCreateClientConnectFn()
			}));
		});

		it('should throw if unable to find the session secret', () => {
			delete realConfig.server.sessionSecret;
			expect(() => configureSessionStore(session)).toThrow('Session secret must be set');
		});

		it('should configure a redis store if useRedisSessionStore is true', () => {
			config.server.sessionSecret = 'a fake session secret';
			config.featureFlag.useRedisSessionStore = true;
			config.db.session.redis = {
				host: 'example.org',
				port: 1234,
				ssl: false,
				password: 'some_password'
			};

			configureSessionStore(session);

			expect(createClient).toHaveBeenLastCalledWith({
				socket: {
					host: 'example.org',
					port: 1234,
					tls: false
				},
				password: 'some_password',
				legacyMode: true,
				pingInterval: 300000
			});
			expect(mockCreateClientOnFn).toBeCalledWith('connect', expect.any(Function));
			expect(mockCreateClientOnFn).toBeCalledWith('ready', expect.any(Function));
			expect(mockCreateClientOnFn).toBeCalledWith('end', expect.any(Function));
			expect(mockCreateClientOnFn).toBeCalledWith('error', expect.any(Function));
			expect(mockCreateClientOnFn).toBeCalledWith('reconnecting', expect.any(Function));
			expect(mockCreateClientConnectFn).toBeCalled();
		});

		it('should configure with the expected config', () => {
			config.server.sessionSecret = 'a fake session secret';

			const configuredSession = configureSessionStore(session);

			expect(configuredSession.cookie.maxAge).toEqual(14400000);
			expect(configuredSession.resave).toEqual(false);
			expect(configuredSession.saveUninitialized).toEqual(true);
			expect(configuredSession.secret).toEqual(config.server.sessionSecret);
		});

		it('should configure with the expected config when useSecureSessionCookie', () => {
			config.server.sessionSecret = 'a fake session secret';
			config.server.useSecureSessionCookie = true;

			const configuredSession = configureSessionStore(session);

			expect(configuredSession.cookie.secure).toEqual(true);
			expect(configuredSession.resave).toEqual(false);
			expect(configuredSession.saveUninitialized).toEqual(true);
			expect(configuredSession.secret).toEqual(config.server.sessionSecret);
		});
	});
});
