const logger = require('../../../lib/logger');

const addCommonTranslationsMiddleware = (req, res, next) => {
	const { i18n } = req;

	i18n.loadNamespaces('common', (err) => {
		if (err) {
			logger.error(err);
			return res.status(500).render('error/unhandled-exception');
		} else next();
	});
};

module.exports = { addCommonTranslationsMiddleware };
