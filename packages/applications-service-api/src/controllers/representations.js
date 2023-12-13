/* eslint-disable no-nested-ternary */
const { StatusCodes } = require('http-status-codes');

const logger = require('../lib/logger');

const {
	getRepresentationsForApplication,
	getRepresentationById
} = require('../services/representation.service');

const ApiError = require('../error/apiError');

module.exports = {
	async getRepresentationsForApplication(req, res) {
		try {
			logger.debug(`Retrieving all representations ...`);

			const { representations, totalItems, currentPage, itemsPerPage, totalPages, filters } =
				await getRepresentationsForApplication(req.query);

			res.status(StatusCodes.OK).send({
				representations,
				totalItems,
				currentPage,
				itemsPerPage,
				totalPages,
				filters
			});
		} catch (e) {
			if (e instanceof ApiError) {
				logger.debug(e.message);
				res.status(e.code).send({ code: e.code, errors: e.message.errors });
				return;
			}
			logger.error(e.message);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Problem getting representations \n ${e}`);
		}
	},

	async getRepresentationById(req, res) {
		const { id } = req.params;
		const { caseReference } = req.query;
		logger.debug(`Retrieving representation by id ${id}`);
		const representation = await getRepresentationById(id, caseReference);

		if (!representation) {
			throw ApiError.representationNotFound(id);
		}

		res.status(StatusCodes.OK).send(representation);
	}
};
