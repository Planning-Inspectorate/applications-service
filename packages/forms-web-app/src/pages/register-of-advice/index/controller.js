const logger = require('../../../lib/logger');
const { listAdvice } = require('../../../services/advice.service');
const { getPageData } = require('./_utils/get-page-data');
const { registerOfAdviceCaseRef } = require('./config');

const view = 'register-of-advice/index/view.njk';

const getRegisterOfAdviceController = async (req, res, next) => {
	try {
		const { query } = req;
		const { searchTerm, page, itemsPerPage } = query;

		const { advice, pagination } = await listAdvice(registerOfAdviceCaseRef, searchTerm, {
			page,
			itemsPerPage
		});

		return res.render(
			view,
			getPageData(req, query, registerOfAdviceCaseRef, searchTerm, advice, pagination)
		);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getRegisterOfAdviceController };
