const { StatusCodes } = require('http-status-codes');

const logger = require('../lib/logger');

const { getAdvice } = require('../services/advice.service');

const ApiError = require('../error/apiError');

module.exports = {
	async getAdvice(req, res) {
		logger.debug(`Retrieving advice ...`);
		try {
			const itemsPerPage = Number(req.query.size) ?? 25;
			const page = Number(req.query.page) ?? 1;

			const advice = await getAdvice({
				caseReference: req.query.caseRef,
				page,
				itemsPerPage
				// For next ticket
				//searchTerm: req.query.searchTerm
			});

			const paginationData = {
				totalItems: advice.count,
				itemsPerPage: itemsPerPage,
				totalPages: Math.ceil(Math.max(1, advice.count) / itemsPerPage),
				currentPage: page
			};

			res.status(StatusCodes.OK).send({
				advice: advice.rows,
				...paginationData
			});
		} catch (e) {
			if (e instanceof ApiError) {
				logger.debug(e.message);
				res.status(e.code).send({ code: e.code, errors: e.message.errors });
				return;
			}
			logger.error(e.message);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Problem getting advice \n ${e}`);
		}
	}
};
