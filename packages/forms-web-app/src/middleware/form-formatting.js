const { formatFormString } = require('../lib/format-form-string');

module.exports = function formFormatting() {
	return (req, res, next) => {
		try {
			if (
				req.method === 'POST' &&
				['application/json', 'application/x-www-form-urlencoded'].includes(
					req.headers['content-type']
				)
			) {
				req.body = Object.fromEntries(
					Object.entries(req.body).map(([key, value]) => [
						key,
						typeof value === 'string' ? formatFormString(value) : value
					])
				);
			}

			return next();
		} catch {
			return next();
		}
	};
};
