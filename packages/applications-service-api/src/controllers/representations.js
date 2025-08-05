/* eslint-disable no-nested-ternary */
const { StatusCodes } = require('http-status-codes');

const logger = require('../lib/logger');

const {
	getRepresentationsForApplication,
	getRepresentationByIdAndCaseRef
} = require('../services/representation.service');

const ApiError = require('../error/apiError');

module.exports = {
	async getRepresentationsForApplication(req, res) {
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
	},

	async getRepresentationById(req, res) {
		const { id } = req.params;
		const { caseReference } = req.query;
		logger.debug(`Retrieving representation by id ${id}`);
		const representation = await getRepresentationByIdAndCaseRef(id, caseReference);

		if (!representation) {
			throw ApiError.representationNotFound(id);
		}

		res.status(StatusCodes.OK).send(representation);
	}
};
