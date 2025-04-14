const cacheNoStoreMiddleware = (req, res, next) => {
	res.set('Cache-Control', 'no-store');
	next();
};

const cacheNoCacheMiddleware = (req, res, next) => {
	res.set('Cache-Control', 'no-cache');
	next();
};

const cacheMaxAgeMiddleware = (maxAge) => (req, res, next) => {
	if (!maxAge) {
		throw new Error('Max age value (in seconds) is required');
	}

	res.set('Cache-Control', `max-age=${maxAge}`);
	next();
};

const cacheMustRevalidateMaxAgeMiddleware = (maxAge) => (req, res, next) => {
	if (typeof maxAge === 'undefined' || typeof maxAge !== 'number') {
		throw new Error('Max age value (in seconds) is required');
	}
	res.set('Cache-Control', `must-revalidate, max-age=${maxAge}`);
	next();
};

module.exports = {
	cacheNoStoreMiddleware,
	cacheNoCacheMiddleware,
	cacheMaxAgeMiddleware,
	cacheMustRevalidateMaxAgeMiddleware
};
