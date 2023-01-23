const parseRedisConnectionString = (redisConnectionString) => {
	if (!redisConnectionString) return {};

	const components = redisConnectionString.split(',');

	if (components.length !== 4) {
		throw new Error(
			"Redis connection string not in expected format (4 parts comma separated): 'some.example.org:6380,password=some_password,ssl=True,abortConnect=False'"
		);
	}

	const hostComponents = components[0].split(':');

	if (hostComponents.length !== 2) {
		throw new Error(
			"Hostname and port not in expected format (separated by colon): 'some.example.org:6380'"
		);
	}

	const truePattern = new RegExp('True', 'i');

	return {
		host: hostComponents[0],
		port: parseInt(hostComponents[1]),
		password: components[1].replace(/^password=/, ''),
		ssl: truePattern.test(components[2]),
		abortConnect: truePattern.test(components[3])
	};
};

module.exports = {
	parseRedisConnectionString
};
