const config = require('../config');
const logger = require('./logger');
const { createClient } = require('redis');
const ConnectRedis = require('connect-redis');

const configureSessionStore = (session) => {
	if (!config.server.sessionSecret) throw new Error('Session secret must be set');

	let sessionConfig = {
		secret: config.server.sessionSecret,
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * config.server.sessionLengthInHours
		}
	};

	if (config.server.useSecureSessionCookie) {
		sessionConfig.cookie.secure = true;
	}

	if (config.featureFlag.useRedisSessionStore) {
		sessionConfig.store = configureRedisStore(session);
	}

	return sessionConfig;
};

const configureRedisStore = (session) => {
	const RedisStore = ConnectRedis(session);

	const redisConfig = config.db.session.redis;

	const redisClient = createClient({
		socket: {
			host: redisConfig.host,
			port: redisConfig.port,
			tls: redisConfig.ssl
		},
		password: redisConfig.password,
		legacyMode: true,
		pingInterval: 1000 * 60 * 5 // 5 minutes; to stop Azure Redis 10 minutes idle timeout
	});

	redisClient.on('connect', () => logger.info('Initiating connection to redis server...'));
	redisClient.on('ready', () => logger.info('Connected to redis server successfully...'));
	redisClient.on('end', () => logger.info('Disconnected from redis server...'));
	redisClient.on('error', (err) =>
		logger.error(`Could not establish a connection with redis server: ${err}`)
	);
	redisClient.on('reconnecting', () => logger.info('Reconnecting to redis server...'));

	redisClient.connect();

	return new RedisStore({ client: redisClient });
};

module.exports = {
	configureSessionStore
};
