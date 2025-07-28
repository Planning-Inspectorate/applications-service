class NotFoundError extends Error {
	constructor(message = '', ...args) {
		super(message, ...args);
		this.message = `Resource not found: ${message}`;
	}
}

module.exports = { NotFoundError };
