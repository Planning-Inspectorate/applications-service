const logger = require('../../../lib/logger');

const addCommonTranslationsMiddleware = async (req, res, next) => {
	const { i18n } = req;

	try {
		await i18n.loadNamespaces('common');
		next();
	} catch (err) {
		logger.error(err);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = { addCommonTranslationsMiddleware };
