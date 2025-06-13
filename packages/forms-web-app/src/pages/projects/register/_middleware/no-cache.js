const noCache = (req, res, next) => {
	res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
	next();
};

module.exports = { noCache };
