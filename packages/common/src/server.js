const http = require('http');

const createServer = (app, config, logger) => {
	/**
	 * Get port from environment and store in Express.
	 */
	const { port } = config.server;
	app.set('port', port);

	/**
	 * Create HTTP server.
	 */
	const server = http.createServer(app);

	/**
	 * Event listener for HTTP server "error" event.
	 */
	const onError = (error) => {
		if (error.syscall !== 'listen') {
			throw error;
		}

		// handle specific listen errors with friendly messages
		switch (error.code) {
			case 'EACCES':
				logger.error({ port }, `App requires elevated privileges`);
				process.exit(1);
				break;
			case 'EADDRINUSE':
				logger.error({ port }, `Port already in use`);
				process.exit(1);
				break;
			default:
				throw error;
		}
	};

	/**
	 * Event listener for HTTP server "listening" event.
	 */
	const onListening = () => {
		logger.info({ config }, 'Listening!');
	};

	server.listen(port);
	server.on('error', onError);
	server.on('listening', onListening);

	return server;
};

module.exports = {
	createServer
};
