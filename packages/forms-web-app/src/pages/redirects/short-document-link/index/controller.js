const logger = require('../../../../lib/logger');

const { getShortDocLink } = require('../../../services');

const getDocumentShortLinkController = async (req, res, next) => {
	try {
		const { docRef } = req.params;

		const data = await getShortDocLink(docRef);

		return res.redirect(data.path);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getDocumentShortLinkController
};
