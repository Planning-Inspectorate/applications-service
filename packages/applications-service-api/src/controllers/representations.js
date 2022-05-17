/* eslint-disable no-nested-ternary */
const { StatusCodes } = require('http-status-codes');

const logger = require('../lib/logger');
const config = require('../lib/config');

const {
  getRepresentationsForApplication,
  getRepresentationById,
  getFilters,
} = require('../services/representation.service');

const ApiError = require('../error/apiError');

module.exports = {
  async getRepresentationsForApplication(req, res) {
    const { applicationId, page, searchTerm, type } = req.query;
    let types = [];
    if (type) {
      types = type instanceof Array ? [...type] : type.split(',');
    }
    const selectedPage = page || 1;
    logger.debug(`Retrieving representations for application ref ${applicationId}`);
    try {
      const representations = await getRepresentationsForApplication(
        applicationId,
        selectedPage,
        searchTerm,
        types
      );

      const typeFilters = await getFilters('RepFrom', applicationId);
      const { itemsPerPage } = config;
      const totalItems = representations.count;
      const wrapper = {
        representations: representations.rows,
        totalItems,
        itemsPerPage,
        totalPages: Math.ceil(Math.max(totalItems, 1) / itemsPerPage),
        currentPage: selectedPage,
        filters: {
          typeFilters: typeFilters
            ? typeFilters.map((f) => ({
                name: f.dataValues.RepFrom,
                count: f.dataValues.count,
              }))
            : [],
        },
      };

      res.status(StatusCodes.OK).send(wrapper);
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
  },
};
