const logger = require('../../../lib/logger');

const addErrorTranslationsMiddleware = async (req, res, next) => {
	const { i18n } = req;

	try {
		await i18n.loadNamespaces('errors');
		next();
	} catch (err) {
		logger.error(err);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = { addErrorTranslationsMiddleware };
