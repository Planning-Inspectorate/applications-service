const { sanitiseString } = require('../lib/sanitise-string');

module.exports = function formSanitisation() {
	return (req, res, next) => {
		try {
			if (
				req.method === 'POST' &&
				['application/json' /* , 'application/x-www-form-urlencoded' */].includes(
					req.headers['content-type']
				)
			) {
				req.body = Object.fromEntries(
					Object.entries(req.body).map(([key, value]) => [
						key,
						typeof value === 'string' ? sanitiseString(value) : value
					])
				);

				return next();
			}

			return next();
		} catch {
			return next();
		}
	};
};
