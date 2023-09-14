/* eslint-disable no-nested-ternary */
const { StatusCodes } = require('http-status-codes');

const logger = require('../lib/logger');
const config = require('../lib/config');

const {
	getRepresentationsForApplication,
	getRepresentationById
} = require('../services/representation.service');

const { getDocumentsByDataId } = require('../repositories/document.ni.repository');

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
		logger.debug(`Retrieving representation by id ${id}`);
		try {
			const representation = await getRepresentationById(id);

			if (!representation) {
				throw ApiError.representationNotFound(id);
			}
			const { documentsHost } = config;

			const dataIDs = representation.Attachments ? representation.Attachments.split(',') : [];
			let attachments = await getDocumentsByDataId(dataIDs);

			if (
				attachments &&
				attachments['0'] &&
				Object.keys(attachments['0']).length === 0 &&
				Object.getPrototypeOf(attachments['0']) === Object.prototype
			) {
				logger.debug('has no attachment');
			} else if (attachments && attachments.length != 0) {
				attachments = attachments.map((att) => ({
					...att.dataValues,
					path: att.dataValues.path != null ? `${documentsHost}${att.dataValues.path}` : null
				}));
			}
			representation.attachments = Object.values(attachments);

			res.status(StatusCodes.OK).send(representation);
		} catch (e) {
			if (e instanceof ApiError) {
				logger.debug(e.message);
				res.status(e.code).send({ code: e.code, errors: e.message.errors });
				return;
			}
			logger.error(e.message);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Problem getting representation \n ${e}`);
		}
	}
};
