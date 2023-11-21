const { StatusCodes } = require('http-status-codes');

const logger = require('../lib/logger');
const { documentsHost } = require('../lib/config');
const {
	getAllAdvice: getAllAdviceService,
	getAdviceById: getAdviceByIdService
} = require('../services/advice.service');
const ApiError = require('../error/apiError');

const getAdvice = async (req, res) => {
	logger.debug(`Retrieving advice ...`);
	const { caseRef } = req.query;

	try {
		if (!caseRef) {
			throw ApiError.badRequest('missing required parameter: caseRef');
		}

		const { advice, totalItems, itemsPerPage, totalPages, currentPage } = await getAllAdviceService(
			req.query
		);

		if (totalItems === 0) {
			throw ApiError.adviceNotFound(caseRef);
		}

		res.status(StatusCodes.OK).send({
			advice: advice,
			totalItems: totalItems,
			itemsPerPage: itemsPerPage,
			totalPages: totalPages,
			currentPage: currentPage
		});
	} catch (e) {
		if (e instanceof ApiError) {
			logger.debug(e.message);
			res.status(e.code).send({ code: e.code, errors: e.message.errors });
			return;
		}
		logger.error(e.message);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
			message: `Problem getting advice \n ${e}`
		});
	}
};

const getAdviceById = async (req, res) => {
	const { adviceID } = req.params;
	try {
		logger.debug(`Retrieving advice by ID...`);

		const advice = await getAdviceByIdService(adviceID);

		if (!advice) {
			throw ApiError.adviceNotFound(adviceID);
		}

		res.status(StatusCodes.OK).send({
			...advice,
			attachments: advice.attachments.map((adviceAttachment) => ({
				...adviceAttachment,
				documentURI: adviceAttachment.documentURI
					? `${documentsHost}${adviceAttachment.documentURI}`
					: null
			}))
		});
	} catch (e) {
		if (e instanceof ApiError) {
			logger.debug(e.message);
			res.status(e.code).send({ code: e.code, errors: e.message.errors });
			return;
		}
		logger.error(e.message);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
			message: `Problem getting advice ${adviceID} \n ${e}`
		});
	}
};

module.exports = {
	getAdvice,
	getAdviceById
};
