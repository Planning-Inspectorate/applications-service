const logger = require('../../lib/logger');
const { getPageData } = require('./utils/get-page-data');
const { featureFlag } = require('../../config');

const view = 'index/view.njk';

const getIndexController = async (req, res, next) => {
	try {
		const { allowWelshCases, enableProjectsMap } = featureFlag;
		const { i18n } = req;

		return res.render(view, {
			...getPageData(i18n.language),
			allowWelshCases,
			enableProjectsMap
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getIndexController
};
