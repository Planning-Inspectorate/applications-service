const { StatusCodes } = require('http-status-codes');

const logger = require('../lib/logger');
const {
	getAllAdvice: getAllAdviceService,
	getAdviceById: getAdviceByIdService
} = require('../services/advice.service');
const ApiError = require('../error/apiError');

const getAdvice = async (req, res) => {
	logger.debug(`Retrieving advice ...`);

	const { advice, totalItems, itemsPerPage, totalPages, currentPage } = await getAllAdviceService(
		req.query
	);

	res.status(StatusCodes.OK).send({
		advice: advice,
		totalItems: totalItems,
		itemsPerPage: itemsPerPage,
		totalPages: totalPages,
		currentPage: currentPage
	});
};

const getAdviceById = async (req, res) => {
	logger.debug(`Retrieving advice by ID...`);

	const { adviceID } = req.params;
	const { caseReference } = req.query;

	const advice = await getAdviceByIdService(adviceID, caseReference);

	if (!advice) {
		throw ApiError.adviceNotFound(adviceID);
	}

	res.status(StatusCodes.OK).send(advice);
};

module.exports = {
	getAdvice,
	getAdviceById
};
